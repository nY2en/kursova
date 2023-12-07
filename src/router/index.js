import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/signup",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/signin",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/board",
    name: "Home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && from.path === "/") next({ name: "Login" });
  else next();
});

export default router;
