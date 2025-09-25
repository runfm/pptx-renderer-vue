import { createWebHistory, createRouter } from "vue-router";

const DefaultLayout = () => import("@/layouts/default_layout/index.vue");
const NotFoundLayout = () => import("@/layouts/not_found_layout/index.vue");

const routes = [
  { path: "/", component: DefaultLayout },
  { path: "/:pathMatch(.*)*", component: NotFoundLayout },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
