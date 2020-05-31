<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(item,index) in silderImgArr" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in musicListArr" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.copywriter}}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{item.name}}</p>
        </div>

      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in newArrMusicList" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="playMusic(item.id)"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{item.name}}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in mvList" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'discovery',
  data() {
    return {
      silderImgArr: [],
      musicListArr:[],
      newArrMusicList:[],
      mvList:[],
      // playimgMusicUrl:''
    }
  },
  created() {
    axios({
      url:"https://autumnfish.cn/banner",
      methods:'get',
    }).then(
      // console.log(res)
      res => {
        // console.log(res)
        this.silderImgArr = res.data.banners,
        console.log(this.silderImgArr)

      }
    ),
    // 获取歌单
    axios({
      url:"https://autumnfish.cn/personalized",
      methods:'get',
      params: {
        limit:10
      }
    }).then(
      // console.log(res)
      res => {
        console.log(res)
        this.musicListArr = res.data.result
        // console.log(this.silderImgArr)
      }
    ),
    axios({
      url:"https://autumnfish.cn/personalized/newsong",
      methods:'get'
    }).then(
      res => {
        console.log('11',res)
        this.newArrMusicList = res.data.result
        // console.log(this.silderImgArr)
      }
    ),
    axios({
      url:"https://autumnfish.cn/personalized/mv",
      methods:'get'
    }).then(
      res => {
        console.log('12',res)
        this.mvList = res.data.result
        // console.log(this.silderImgArr)
      }
    )
  },
  methods:{
    playMusic(musicId){
      console.log("是否拿到了id",musicId)

      axios({
        url:"https://autumnfish.cn/song/url",
        methods:'get',
        params:{
          id:musicId
        }
      }).then(
        res => {
          console.log(res,'dd')
          let nowPlaymusic = res.data.data[0].url;
          this.$parent.musicUrl = nowPlaymusic



        }
      )



    }
  }

};

</script>

<style >

</style>
