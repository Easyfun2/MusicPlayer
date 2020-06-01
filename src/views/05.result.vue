<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{ keywords }}</h2>
      <span class="sub-title">找到{{ song_count }}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in songList"
              :key="index"
              class="el-table__row"
              @dbclick="playMusic(item.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                  <span>{{ item.alias[0] }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration | durationInit }}</td>
            </tr>
            <tr class="el-table__row">
              <td>2</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>你要相信这不是最后一天</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                </div>
              </td>
              <td>华晨宇</td>
              <td>你要相信这不是最后一天</td>
              <td>06:03</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <!-- tab2 | 歌单 -->
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" 
          v-for="(item, index) in playlists" 
          :key="index"
          @click="toPlaylist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount | InitPlayCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>

        </div>
      </el-tab-pane>

      <!-- tab2 | MV -->
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item,index) in mv"
          :key="index"
          @click="toMV(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount | InitPlayCount}}</div>
              </div>
              <span class="time">{{ item.duration | durationInit}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>

        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "result",
  data() {
    return {
      activeIndex: "songs",
      songList: [],
      keywords: "",
      song_count: 0,
      songList_count:0,
      playlists:[],
      mv_count:0,
      mv:[]

    };
  },
  created() {
    this.keywords = this.$route.query.q;
    this.getSongList(this.keywords);
  },
  methods: {
    getSongList(val) {
      // 一、 获取歌曲
      Axios({
        url: "https://autumnfish.cn/search",
        methods: "get",
        params: {
          keywords: val,
          limit: 10,
        },
      }).then((res) => {
        // 一、获取歌曲
        this.songList = res.data.result.songs;
        console.log("res的内容", res);
        this.playlists = res.data.result.playlists;
        this.song_count = res.data.result.songCount;
      })

        // 二、 获取歌单
      console.log("开始获取歌单！")
      Axios({
        url: "https://autumnfish.cn/search",
        methods: "get",
        params: {
          keywords: val,
          type: 1000,
        },
      }).then((res) => {
        this.playlists = res.data.result.playlists;
        // 总数
        this.songList_count = res.data.result.playlistCount;
        // 处理 播放次数
        for (let i = 0; i < this.playlists.length; i++) {
          if (this.playlists[i].playCount > 100000) {
            this.playlists[i].playCount =
              parseInt(this.playlists[i].playCount / 10000) + "万";
          }
        }
      }),

        // 三、 获取MV列表
      console.log("开始获取MV列表")
      Axios({
        url: "https://autumnfish.cn/search",
        methods: "get",
        params: {
          keywords: val,
          type: 1004,
          },
        }).then((res) => {
          // 保存mv数据
          this.mv = res.data.result.mvs
          // 总数
          this.mv_count = res.data.result.mvCount
          // 处理数据
          // for (let i = 0; i < this.mv.length; i++) {
          //   // 时间
          //   let min = parseInt(this.mv[i].duration / 1000 / 60)
          //   let sec = parseInt((this.mv[i].duration / 1000) % 60)
          //   if (min < 10) {
          //     min = '0' + min
          //   }
          //   if (sec < 10) {
          //     sec = '0' + sec
          //   }
          //   this.mv[i].duration = min + ':' + sec

          //   // 播放次数
          //   if (this.mv[i].playCount > 100000) {
          //     this.mv[i].playCount =
          //       parseInt(this.mv[i].playCount / 10000) + '万'
          //   }
          // }
        })
    },
    toMV(id){
        this.$router.push(`/mv?q=${id}`)
      },
      // 去歌单详情页
    toPlaylist(id){
        // 跳转并携带数据即可
        this.$router.push(`/playlist?q=${id}`)
      },

    // 播放音乐
    playMusic(id) {
      Axios({
        url: "https://autumnfish.cn/song/url",
        methods: "get",
        params: {
          id,
        },
      }).then((res) => {
        // console.log(res)
        let url = res.data.data[0].url;
        this.$parent.musicUrl = url;
      });
    },
  },

  watch: {
    // 监控路由传参
    $route: {
      handler(n, o) {
        console.log("新的query", n.query.q);
        console.log("旧的query", o.query.q);
        this.keywords = this.$route.query.q;
        this.getSongList(this.keywords);
      },
      deep: true,
    },
    activeIndex() {
      let type = 1;
      let limit = 30;
      switch (this.activeIndex) {
        case "songs":
          type = 1;
          limit = 10;
          break;
        case "lists":
          type = 100;
          limit = 10;
          break;
  
        case "mv":
          type = 1004;
          limit = 8;
          break;

        default:
          break;
      }

      // Axios({
      //   url:
      // })

      console.log(..."此时的纸");
      console.log("此时的值", type, "|", limit);
    },
  },
  filters: {
    durationInit: function(val) {
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
      // this.songList[i].duration = min + ':' + sec
    },
  },
};
</script>

<style></style>
