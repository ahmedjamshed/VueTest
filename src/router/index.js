import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    children: [
      {
        path: "",
        redirect: "/tasks",
      },
      {
        path: "/admin",
        component: () =>
          import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
        meta: {
          admin: true,
        },
      },
      {
        path: "tasks",
        component: () =>
          import(/* webpackChunkName: "tasks" */ "../views/Tasks.vue"),
      },
      {
        path: "locations",
        component: () =>
          import(/* webpackChunkName: "locations" */ "../views/Locations.vue"),
      },
    ],
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await new Promise((res) => {
    getAuth().onAuthStateChanged(() => {
      res();
    });
  });
  const user = getAuth().currentUser;
  if (
    user &&
    user.uid === process.env.VUE_APP_ADMIN_UID &&
    (to.path.toLowerCase() === "/tasks" ||
      to.path.toLowerCase() === "/locations")
  ) {
    next({ path: "/admin" });
    return;
  }
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (user) {
      next();
    } else {
      // alert("You must be logged in to see this page");
      next({ path: "/login" });
    }
  } else {
    if (user && to.path.toLowerCase() === "/login") {
      next({ path: "/" });
    } else next();
  }
});
export default router;
