<template>
  <div v-if="currentTopic" class="edit-form">
    <h4>Topic</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTopic.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Content</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTopic.content"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTopic.published ? "Done" : "Work-In-Progress" }}
      </div>
    </form>

<!--    <button class="badge badge-primary mr-2"
      v-if="currentTopic.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteTopic"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateTopic"
    >
      Update
    </button> -->
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Topic...</p>
  </div>
</template>

<script>
import TopicDataService from "../services/TopicDataService";

export default {
  name: "topic",
  data() {
    return {
      currentTopic: null,
      message: ''
    };
  },
  methods: {
    getTopic(id) {
      TopicDataService.get(id)
        .then(response => {
          this.currentTopic = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTopic.id,
        title: this.currentTopic.title,
        description: this.currentTopic.description,
        published: status
      };

      TopicDataService.update(this.currentTopic.id, data)
        .then(response => {
          console.log(response.data);
          this.currentTopic.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateTopic() {
      TopicDataService.update(this.currentTopic.id, this.currentTopic)
        .then(response => {
          console.log(response.data);
          this.message = 'The topic was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteTopic() {
      TopicDataService.delete(this.currentTopic.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "topics" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTopic(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
