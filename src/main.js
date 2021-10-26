import { createApp } from 'vue';
import App from './App.vue';
import Maska from 'maska';
import ymapsVueComponents from 'ymaps-vue-components';
import tooltip from "@/directives/tooltip.js";

const app = createApp(App);

app.use(Maska);

app.config.globalProperties.config = configCheckout;

app.use(ymapsVueComponents);

app.directive("tooltip", tooltip);

app.mount('#app');
