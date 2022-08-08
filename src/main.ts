import { createApp } from "vue";
import App from "./App.vue";

import "./assets/style.scss";

createApp(App).mount(document.getElementsByTagName("weather-widget")[0]);
