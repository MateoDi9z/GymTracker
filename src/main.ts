import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useFirebaseStore } from './stores/firebase'
import { useDataManager } from './stores/dataManager'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

const fb_store = useFirebaseStore()
const d_store = useDataManager()