import { createApp, markRaw } from "vue";
import App from "./App.vue";
import router from "./router";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faAngleDown,
  faAngleUp,
  faXmark,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

library.add(faXmark, faAngleDown, faAngleUp, faAngleLeft);

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});

import VueEllipseProgress from "vue-ellipse-progress";

loadFonts();

createApp(App)
  .use(VueEllipseProgress)
  .use(router)
  .use(pinia)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
