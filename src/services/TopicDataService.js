import http from "../http-common";

class TopicDataService {
  getAll() {
    return http.get("/topics");
  }

  get(id) {
    return http.get(`/topics/${id}`);
  }

  create(data) {
    return http.post("/topics", data);
  }

  update(id, data) {
    return http.put(`/topics/${id}`, data);
  }

  delete(id) {
    return http.delete(`/topics/${id}`);
  }

  deleteAll() {
    return http.delete(`/topics`);
  }

  findByTitle(title) {
    return http.get(`/topics?title=${title}`);
  }
}

export default new TopicDataService();
