<template>
  <h4 style="text-align: center;">Topic List</h4>
  <div class="row">
    <template v-for="(topic, index) in topics" :key="index">
      <div class="col-md-6">
      <div class="image">
        <img width=360 height=270 :src="topic.image"/>
      </div>
      </div>
      <div class="col-md-6">
        <div style="display: block; position: relative;">
          <p>
            {{ topic.content }}<expander :id="'expand-size' + index"></expander>
          </p>
          <router-link @click="startLoading" :to="topic.path" :id="'stem-link' + index" class="badge expander" >More Details<svg style="height: 24px; width: 24px" src="assets/chevron-down-solid.svg"><path d="m5 8.5 7 7 7.005-7" class="icon_svg-stroke" stroke="#666" stroke-width="1.5" fill="none" stroke-linecap="round"></path></svg></router-link>
        </div>
      </div>
      <template v-if="(topics.at(-1) != topics[index])">
        <hr style="width: 100%; border-top: 1px solid rgba(0,0,0,0.1);">
      </template>
    </template>
  </div>
</template>

<script>
import TopicDataService from "../services/TopicDataService";
import { nextTick } from 'vue';

export default {
  name: "topics-list",
  data() {
    return {
      topics: [],
      currentTopic: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
     repadExpander() {
      const topicsList = this.topics;

      for (var i = 0; i < topicsList.length; i++) {
        
      const expander  = document.getElementById(`expand-size${i}`);
      const stem      = document.getElementById(`stem-link${i}`);

      const content = topicsList[i].content;
      let textNode = expander.parentElement.firstChild;
      
      var copy = content.split(' ');
      let breakCount = 0;

      textNode.data = copy[0] + ' ';
      copy = copy.slice(1);

      var height = expander.parentElement.clientHeight;
      console.log(copy);
      for (var word of copy) {
          textNode.data += `${word} `;
          if (height !== expander.parentElement.clientHeight) {
              // Height changed
              breakCount++;
              height = expander.parentElement.clientHeight;
          }
          if (breakCount >= 7) {
              textNode.data = textNode.data.trim(' ');
              textNode.data = textNode.data.slice(0, -(word.length + 1));
              break;
          }
      }
      console.log(breakCount);
      let computed_padding = expander.offsetLeft - 95;
      if (expander.offsetLeft <= 95) {
              computed_padding = expander.offsetLeft;
      }
      if (computed_padding < 200) {
              stem.style.background = "linear-gradient(to left, white 40%, transparent 100%)";
      } else {
              stem.style.background = "linear-gradient(to left, white 25%, transparent 100%)";
      }
      stem.style.paddingLeft = `${computed_padding}px`;
      }
    },
     retrieveTopics() {
      TopicDataService.getAll()
        .then(response => {
          this.topics = response.data;
          nextTick().then(() => {this.repadExpander();})
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTopics();
      this.currentTopic = null;
      this.currentIndex = -1;
    },

    setActiveTopic(topic, index) {
      this.currentTopic = topic;
      this.currentIndex = topic ? index : -1;
    },

    removeAllTopics() {
      TopicDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    startLoading() {
        const preloader = document.getElementById('preloader')
        preloader.style.display = "block";
        preloader.style.opacity = 1;
	setTimeout(() => {preloader.style.opacity = 0}, 200);
	setTimeout(() => {preloader.style.display = "none"}, 2000);
    },
    
    searchTitle() {
      TopicDataService.findByTitle(this.title)
        .then(response => {
          this.topics = response.data;
          this.setActiveTopic(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },


  mounted() {
    this.retrieveTopics();

    
    window.onresize = this.repadExpander;
  }
};
</script>

<style>
.row {
  margin-right: -50px;
}
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
div.image {
  display: block;
  border: 5px solid gray;
  border-radius: 10px;
  width: fit-content;
  height: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.col-md-6 {
  padding-left: 30px;
}
p {
  display: block;
  margin-bottom: 0;
  text-align: justify;
}
.expander {
  position: absolute;
  bottom: 0;
  padding: 0;
  transform: translateX(0px);
  color: gold;
  font-size: 1rem;
  background: linear-gradient(to left, white 30%, transparent 100%);
}
</style>

