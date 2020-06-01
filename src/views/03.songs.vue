<template>
  <div class="songs-container">
    <div class="tab-bar">
      <!-- vue.js 样式绑定 -->
      <span class="item" 
        :class="{ active: tag== '全部'}"
        @click="tag = '全部'">全部</span>
        
      <span class="item" :class="{active:tag=='华语'}"
      @click="tag='华语'"
      >华语</span>
      <span class="item" :class="{active:tag=='欧美'}"
      @click="tag='欧美'"
      >欧美</span>
      <span class="item" :class="{active:tag=='日本'}"
      @click="tag='日本'"
      >日本</span>
      <span class="item" :class="{active:tag=='韩国'}"
      @click="tag='韩国'"
      >韩国</span>
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
              <span class="iconfont icon-play"
              @click="palyMusic(item.id)"></span>
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
      tag:"全部",
      tag_id:0
    };
  },
  created(){
    this.getList()
  },
  methods: {
    getList:function(){
      axios({
      url:"https://autumnfish.cn/top/song",
      methods:'get',
      params:{
        type:this.tag_id
      }
    }).then(
      res=>{
        console.log('getList被调用了')

        this.newSongList = res.data.data
        // console.log('first.newSongList',this.newSongList)
      }
    )
    },
    palyMusic:function(id){
      axios({
        url:'https://autumnfish.cn/song/url',
        methods:'get',
        params:{
          id:id
        }
      }).then(
        res =>{
          console.log('id',id);
          let url = res.data.data[0].url;
          console.log('url',url);
          this.$parent.musicUrl = url;
        }
      )
    }
    },
  // }
  watch:{
    tag(){
      // console.log("变动！！")
      switch(this.tag){
        case "全部":
          this.tag_id = 0;
          break;
        case "华语":
          this.tag_id = 7;
          break;
        case "欧美":
          this.tag_id = 96;
          break;
        case "日本":
          this.tag_id = 8;
          break;
        case "韩国":
          this.tag_id = 16;
          break;
        default:
          break
      }
      console.log('this.tag_id',this.tag_id)
      this.getList()

    }
  }
};
</script>

<style >

</style>
