<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item active" 
        :class={active:tag == "全部"
        @click="tag = '全部'"}>全部</span>
      <span class="item">华语</span>
      <span class="item">欧美</span>
      <span class="item">日本</span>
      <span class="item">韩国</span>
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row" 
          v-for="(item,index) in newSongList"
          :key="index">
          <td>{{index+1}}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.blurPicUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{item.name}}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span>{{item.album.name}}</span>
            </div>
          </td>
          <td>{{item.album.artists[0].name}}</td>
          <td>{{item.album.name}}</td>
          <td>{{item.duration | durationInit}}</td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'songs',
  data() {
    return {
      newSongList:[],
      tag:"全部"
    };
  },
  created(){
    axios({
      url:"https://autumnfish.cn/top/song",
      methods:'get',
      params:{
        type:0
      }
    }).then(
      res=>{
        this.newSongList = res.data.data
        console.log('first.newSongList',this.newSongList)
      }
    )
  }
};
</script>

<style >

</style>
