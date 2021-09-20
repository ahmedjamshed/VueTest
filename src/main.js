import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { _ } from "./store";

import "@fortawesome/fontawesome-free/js/all";

createApp(App)
  .use(router)
  .mount("#app");
