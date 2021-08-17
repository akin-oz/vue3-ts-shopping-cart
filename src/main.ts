import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'
import metaManager from './plugins/metaManager'
import './styles/main.scss';

const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)
app.use(metaManager)
app.mount('#app')