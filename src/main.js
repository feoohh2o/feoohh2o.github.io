import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import SearchReddit from './components/SearchReddit/SearchReddit'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
Vue.use(VueRouter);

const routes = [
  { path: '/search-reddit', component: SearchReddit },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

const app = new Vue({
  router,
  components: {
    App,
  },
  template: "<v-app><App></App></v-app>",
  el: "#app"
})
