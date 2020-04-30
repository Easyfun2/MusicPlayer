import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import card1 from './components/03-card1.vue'
import card2 from './components/04-card2.vue'
import card3 from './components/05-card3.vue'
import card4 from './components/06-card4.vue'
let router = new VueRouter({
  routes:[
    {
      path:'/',
      redirect:'/discovery'
    },
    {
      path:'/discovery',
      component:card1
    },
    {
      path:'/playlists',
      component:card2
    },
    {
      path:'/songs',
      component:card3
    },
    {
      path:'/mvs',
      component:card4
    }
  ]
})
// import 

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
