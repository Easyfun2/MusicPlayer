<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <img :src="top_list.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
          {{ top_list.name }}
        </div>
        <div class="info">
          {{ top_list.description }}
        </div>
      </div>
      <img :src="top_list.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>



    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          :class="{ active: list_tag == '全部' }"
          @click="list_tag = '全部'"
          >全部</span
        >
        <span
          class="item"
          :class="{ active: list_tag == '欧美' }"
          @click="list_tag = '欧美'"
          >欧美</span
        >
        <span
          class="item"
          :class="{ active: list_tag == '华语' }"
          @click="list_tag = '华语'"
          >华语</span
        >
        <span
          class="item"
          :class="{ active: list_tag == '流行' }"
          @click="list_tag = '流行'"
          >流行</span
        >
        <span
          class="item"
          :class="{ active: list_tag == '说唱' }"
          @click="list_tag = '说唱'"
          >说唱</span
        >
        <span
          class="item"
          :class="{ active: list_tag == '摇滚' }"
          @click="list_tag = '摇滚'"
          >摇滚</span
        >
        <span
          class="item"
          :class="{ active: list_tag == '民谣' }"
          @click="list_tag = '民谣'"
          >民谣</span
        >
        <span
          class="item"
          :class="{ active: list_tag == '电子' }"
          @click="list_tag = '电子'"
          >电子</span
        >
        <span
          class="item"
          :class="{ active: list_tag == '轻音乐' }"
          @click="list_tag = '轻音乐'"
          >轻音乐</span
        >
        <span
          class="item"
          :class="{ active: list_tag == '影视原声' }"
          @click="list_tag = '影视原声'"
          >影视原声</span
        >
        <span
          class="item"
          :class="{ active: list_tag == 'ACG' }"
          @click="list_tag = 'ACG'"
          >ACG</span
        >
        <span
          class="item"
          :class="{ active: list_tag == '怀旧' }"
          @click="list_tag = '怀旧'"
          >怀旧</span
        >
        <span
          class="item"
          :class="{ active: list_tag == '治愈' }"
          @click="list_tag = '治愈'"
          >治愈</span
        >
        <span
          class="item"
          :class="{ active: list_tag == '旅行' }"
          @click="list_tag = '旅行'"
          >旅行</span
        >
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item,index) in song_list" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play" @click="toPlayList(item.id)"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>

        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="song_list_total"
      :current-page="page"
      :page-size="10"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "recommend",
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      top_list: {},
      song_list:[],
      list_tag: "全部",
      song_list_total:0
    };
  },
  created() {
    this.getTopList();
    this.getSongList();
  },
  methods: {
    toPlayList:function(id){
      this.$router.push(`/playlist?q=${id}`)
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getSongList();
      console.log(`当前页: ${val}`);
    },

    // 1. 获取top推荐歌单
    getTopList() {
      axios({
        url: "https://autumnfish.cn/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          cat: this.list_tag,
        },
      }).then((res) => {
        // this.$message.success("获取list成功"),
        this.top_list= res.data.playlists[0];
        // this.top_list.total = res.data.total;
        // console.log(this.top_list);
      });
    },

    // 2. 获取全部list歌单
    getSongList() {
      axios({
        url: "https://autumnfish.cn/top/playlist/",
        method: "get",
        params: {
          limit: 10,
          cat: this.list_tag,
          offset:(this.page-1)*10
        },
      }).then((res) => {
        // this.$message.success("获取list成功"),
        this.song_list_total = res.data.total;
        this.song_list= res.data.playlists;
        // this.top_list.total = res.data.total;
        // console.log(this.top_list);
      });
    },
  },
  watch: {
    list_tag() {
      this.getTopList("this.list_tag");
      this.getSongList("this.list_tag");
      this.page = 1

    },
  },
};
</script>

<style></style>
