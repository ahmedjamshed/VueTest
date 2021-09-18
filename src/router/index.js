import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/Login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        // alert("You must be logged in to see this page");
        next({
          path: "/Login",
        });
      }
    });
  } else {
    next();
  }
});

export default router;
