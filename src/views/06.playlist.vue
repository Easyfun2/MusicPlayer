<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="songList_des.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{ songList_des.name }}</p>
        <div class="author-wrap">
          <img class="avatar" :src="songList_des.creator.avatarUrl" alt="" />
          <span class="name">{{songList_des.creator.nickname}}</span>
          <span class="time">{{songList_des.createTime | dataFormat}} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul >
            <li v-for="(item,index) in songList_des.tags"
          :key="index">{{item}}</li>
            <!-- <li>怀旧</li> -->
            <!-- <li>感动</li> -->
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc"
            >{{songList_des.description}}</span
          >
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">

      <!--歌曲列表 -->
      <el-tab-pane label="歌曲列表" name="1">
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
            <tr class="el-table__row" v-for="(item,index) in songList_cont"
            :key="index">
              <td>{{index +1}}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" alt="" />
                  <span class="iconfont icon-play"
                  @click="playMusic(item.id)"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                  <span>{{item.alia[0]}}</span>
                </div>
              </td>
              <td>{{item.ar[0].name}}</td>
              <td>{{item.al.name}}</td>
              <td>{{item.dt | durationInit}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <!-- 评价列表 -->
      <el-tab-pane label="评论(66)" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">精彩评论
            <span class="number">({{ hotCount }})</span></p>
          <div class="comments-wrap">
            <div class="item"
            v-for="(item, index) in hotComment" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}:</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
          </div>
        </div>


        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">最新评论<span class="number">({{ newCount }})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in newComment"
            :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}:</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>

          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="newCount"
          :current-page="page"
          :page-size="20"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  name: 'playlist',
  data() {
    return {
      activeIndex: '1',
      // 总条数
      // total: 0,
      // 页码
      page: 1,
      song_id:'',
      songList_cont:[],
      songList_des:{
        creator:{
          avatarUrl:''
        }
      },
      hotComment:[],
      hotCount:'',
      // newComment
      newComment:[],
      newCount:1,
      limit:20
      // offset:10
      // songList_des.creator.avatarUrl:''
    };
  },
  created(){
    this.getSongList()
    this.getHotComment()
    this.getNewComment()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getNewComment()
      console.log(`当前页: ${val}`);
    },
    getSongList:function(){
      this.song_id = this.$route.query.q
      Axios({
        url:'https://autumnfish.cn/playlist/detail',
        methods:'get',
        params:{
          id:this.song_id
        }
      }).then(
        res =>{
          this.songList_cont = res.data.playlist.tracks
          this.songList_des = res.data.playlist
          console.log('拿到this.songList_des数据了',this.songList_des)
          console.log('拿到this.songList_cont数据了',this.songList_cont)

          
        }
      )
    },
    
    playMusic:function(id){
      Axios({
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
    },
    getHotComment:function(){
      Axios({
        url: "https://autumnfish.cn/comment/hot",
        method: "get",
        params: {
          id: this.$route.query.q,
          // 传递类型
          type: 2
        }
      }).then(
        res=>{
         this.hotComment = res.data.hotComments;
        //  console.log("查看热门评论",this.hotComment)
          // 保存个数
          this.hotCount = res.data.total; 
        }
      )
    },
    getNewComment:function(){
      Axios({
        url: "https://autumnfish.cn/comment/playlist",
        method: "get",
        params: {
          id: this.$route.query.q,
          limit:10,
          // offset:20
          
          offset:(this.page-1)*10
        }
      }).then(
        res=>{
          // console.log('查看offset',this.offset)
          // console.log('查看page',this.page)
         this.newComment = res.data.comments;
          // 保存个数
          this.newCount = res.data.total; 
        }
      )
    },
  }
};
</script>

<style >

</style>
