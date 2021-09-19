import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    children: [
      {
        path: '',
        redirect: 'tasks',
      },
      {
        path: 'tasks',
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Tasks.vue"),
      },
      {
        path: 'locations',
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Locations.vue"),
      },
    ],
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await new Promise((res) => {
    getAuth().onAuthStateChanged(() => { res() })
  })
  const user = getAuth().currentUser
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (user) {
      next();
    } else {
      // alert("You must be logged in to see this page");
      next({ path: "/login" });
    }
  } else {
    if (user && to.path.toLowerCase() === '/login') {
      next({ path: "/" });
    }
    else next();
  }
});
export default router;
