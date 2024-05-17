// import { createApp } from 'vue'
//
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
//
// // Components
// import App from './App.vue'
//
// const vuetify = createVuetify({
//     components,
//     directives,
// })
//
// createApp(App).use(vuetify).mount('#app')

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
