<template>
  <div>
    <!-- 头部组件 -->
    <top></top>

    <!-- 主体组件 -->
    <contenBox></contenBox>
  </div>
</template>

<script>
import top from './components/01-header.vue'
import contenBox from './components/02-content.vue'

export default {
  // name:'app',
  components: {
    top:top,
    contenBox:contenBox
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

</style>