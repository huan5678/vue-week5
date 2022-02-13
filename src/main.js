import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { vfmPlugin } from 'vue-final-modal';

import App from './App.vue';
import router from './router';
import './index.css';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vfmPlugin);

app.mount('#app');
