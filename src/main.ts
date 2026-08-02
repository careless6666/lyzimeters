import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vReveal } from './directives/reveal'
import './styles/main.scss'

const app = createApp(App)
app.use(router)
app.directive('reveal', vReveal)
app.mount('#app')
