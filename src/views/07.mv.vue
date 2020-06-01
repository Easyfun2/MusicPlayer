<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
          controls
          :src="mvVal.url"
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="mvInfo.cover" alt="" />
          </div>
          <span class="name">{{mvInfo.artistName}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{mvInfo.name}}</h2>
          <span class="date">发布：{{mvInfo.publishTime}}</span>
          <span class="number">播放：{{mvInfo.playCount}}次</span>
          <p class="desc">
            {{mvInfo.desc}}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">精彩评论<span class="number">({{mvComment.total}})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item,index) in mvComment.hotComments"
          :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length >0 "
                >
                <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                <span class="comment">{{item.beReplied[0].content}}</span>
              </div>
              <div class="date">{{item.time | dataFormat01}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <!-- !!! 这里的总数 -->
        <p class="title">最新评论<span class="number">({{mvComment.total}})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item,index) in mvComment.comments"
          :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}:</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length >0 ">
                <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                <span class="comment">{{item.beReplied[0].content}}</span>
              </div>
              <div class="date">{{item.time | dataFormat01}}</div>
            </div>
          </div>
 
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="5"
        :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item,index) in relevanceMvList"
          :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play" 
              @click="toMv(item.id)"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount | InitPlayCount}}</div>
              </div>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
// import func from '../../vue-temp/vue-editor-bridge';
export default {
  name: 'mv',
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      mvVal:{},
      mvInfo:{},
      commentLimit:20,
      mvComment:{},
      relevanceMvList:[]
    };
  },
  created(){
    this.getMvList()
    this.getMvInfo()
    this.getMvComment()
    this.getRelevanceMv()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getMvComment()
      console.log(`当前页: ${val}`);
    },
    getMvList:function(){
      Axios({
        url:'https://autumnfish.cn/mv/url',
        methods:'get',
        params:{
          id:this.$route.query.id
        }
      }).then(
        res =>{
          this.mvVal = res.data.data
          console.log('dd',res)
        }
      )
    },
    getMvInfo:function(){

      Axios({
        url:'https://autumnfish.cn/mv/detail',
        methods:'get',
        params:{
          mvid:this.$route.query.id
        }
      }).then(
        res =>{
          console.log('sss',res)
          this.mvInfo = res.data.data
        }
      )
      
    },
    getMvComment:function(){
      Axios({
        url:'https://autumnfish.cn/comment/mv',
        methods:'get',
        params:{
          id:this.$route.query.id,
          limit:this.commentLimit,
          offset:(this.page-1)*this.commentLimit
        }
      }).then(
        res=>{
          this.mvComment = res.data
          console.log('评论数据获取成功',res)
          console.log('评论数据获取成功',this.mvComment)
        }
      )
    },
    getRelevanceMv(){
      Axios({
        url:'https://autumnfish.cn/simi/mv',
        methods:'get',
        params:{
          mvid:this.$route.query.id
        }
      }).then(
        res=>{
          this.relevanceMvList = res.data.mvs
          // console.log('相关mv info',res)
        }
      )
    },
    toMv(id){
      this.$router.push(`/mv?id=${id}`)
    }
  },
  watch:{
    $route(){
      this.getMvList()
      this.getMvInfo()
      this.getMvComment()
      this.getRelevanceMv()
      
    }
  }
};
</script>

<style></style>
