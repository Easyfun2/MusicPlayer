<template>
  <div class="content">
    <!-- 左侧导航 -->
    <div class="nav">
      <ol>
        <li>
          <router-link to="/discovery">发现音乐</router-link>
        </li>
        <li>
          <router-link to="/playlists">推荐歌单</router-link>
        </li>
        <li>
          <router-link to="/songs">最新音乐</router-link>
        </li>
        <li>
          <router-link to="/mvs">最新MV</router-link>
        </li>
      </ol>
    </div>

    <!-- 右侧容器 -->
    <div class="card">
      <router-view></router-view>
      <!-- <hr> -->
      <!-- <card1></card1> -->
    </div>
  </div>
</template>

<script>
import card1 from '../components/03-card1.vue'
  export default {
    name:'contenBox',
    components:{
      card1:card1
    }

  }
</script>



<style>

  .content{
    display: flex;
    height: 830px;
  }

  .content .nav{
    width: 200px;
    background-color: #ededed;
  }

  .content .nav li{
    text-align: center;
    margin:10px
  }

  .content .card{
    background-color: orange;
    /* 使用剩余的尺寸 */
    flex: 1;
  }
  
  /* .content .card img{
    width: 300px;
    height: 400px;
    box-sizing: border-box;
  } */

/* 点击高亮效果 */
  a.router-link-active{
    color: green;
    background-color: red;
  }

</style>
