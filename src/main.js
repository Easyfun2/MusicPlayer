import Vue from 'vue'
import App from './App.vue'

// 导入 Element_ui
import ElementUI from 'element-ui'
// 导入 Element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 插件 Element-ui
Vue.use(ElementUI)

// 处理歌曲时间 
Vue.filter('durationInit',function(val){
  let min = parseInt(val / 1000 / 60);
  let sec = parseInt((val / 1000) % 60);
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  // console.log(min + '|' + sec)

  return min + ":" + sec;
})

// 处理歌曲播放量
Vue.filter('InitPlayCount',function(val){
  // console.log(val)
  // console.log(val.toString().length)
  if(val >= 100000){
    // let res = parseInt(val / 10000) + '万'
    let res = (val / 10000).toFixed(2) + '万'
    // console.log(val / 10000)
    // console.log(res)
    return res
  }else{
    return val
  }

})

Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + 1 + '').padStart(2, '0')

  const hh = (dt.getHours() + 1 + '').padStart(2, '0')
  const mm = (dt.getMinutes() + 1 + '').padStart(2, '0')
  const ss = (dt.getSeconds() + 1 + '').padStart(2, '0')
  // return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  return `${y}-${m}-${d}`
})

// 导入全局初始化样式
import './assets/index.css'

// 路由整合
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入对应的路由
import discovery from './views/01.discovery.vue'
import playlists from './views/02.playlists.vue'
import songs from './views/03.songs.vue'
import mvs from './views/04.mvs.vue'
import result from './views/05.result.vue'
import playlist from './views/06.playlist.vue'
import mv from './views/07.mv.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/discovery'
    },
    {
      // 发现音乐
      path: '/discovery',
      component: discovery
    },
    {
      // 推荐歌单
      path: '/playlists',
      component: playlists
    },
    {
      // 推荐歌单
      path: '/playlist',
      component: playlist
    },
    {
      // 最新音乐
      path: '/songs',
      component: songs
    },
    {
      // 最新音乐
      path: '/mvs',
      component: mvs
    },
    // mv详情
    {
      path: '/mv',
      component: mv
    },
    // 搜索结果页
    {
      path: '/result',
      component: result
    }
  ]
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载到Vue示例上
  router
}).$mount('#app')
