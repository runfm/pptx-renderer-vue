import { createWebHistory, createRouter } from "vue-router";

const DefaultLayout = () => import("@/layouts/default_layout/index.vue");
const NotFoundLayout = () => import("@/layouts/not_found_layout/index.vue");

const PptxParserPage = () => import("@/pages/pptx_parser_page/index.vue");

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "pptx-parser",
        component: PptxParserPage,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", component: NotFoundLayout },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
