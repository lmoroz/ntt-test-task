// import { createApp } from 'vue';
//
// import 'vuetify/styles';
// import { createVuetify } from 'vuetify';
// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';
//
// // Components
// import App from './App.vue';
//
// const vuetify = createVuetify({
//   components,
//   directives,
// });
//
// createApp(App).use(vuetify).mount('#app');

// Composables
import { createApp } from 'vue';

// vuetify
import 'vuetify/styles';

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

const app = createApp(App);
registerPlugins(app);
app.mount('#app');

// // Plugins
// import { registerPlugins } from '@/plugins';
//
// // Components
// import App from './App.vue';
//
// // Composables
// import { createApp } from 'vue';
//
// const app = createApp(App);
//
// registerPlugins(app);
//
// app.mount('#app');
