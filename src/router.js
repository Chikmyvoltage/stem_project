import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/topics",
    name: "topics",
    component: () => import("./components/TopicsList")
  },
  {
    path: "/topics/:id",
    name: "topic-details",
    component: () => import("./components/Topic")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTopic")
  },
  {
    path: "/stem",
    name: "stem",
    component: () => import('./components/Stem')
  },
  {
    path: "/relativity",
    name: "relativity",
    component: () => import('./components/Relativity')
  },
  {
    path: "/404",
    alias: "/:catchAll(.*)",
    component: () => import('./components/NotFound')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
