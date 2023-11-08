<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="topic.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="topic.description"
          name="description"
        />
      </div>

      <button @click="saveTopic" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTopic">Add</button>
    </div>
  </div>
</template>

<script>
import TopicDataService from "../services/TopicDataService";

export default {
  name: "add-topic",
  data() {
    return {
      topic: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveTopic() {
      var data = {
        title: this.topic.title,
        description: this.topic.description
      };

      TopicDataService.create(data)
        .then(response => {
          this.topic.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTopic() {
      this.submitted = false;
      this.topic = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
