<template>
  <div id="app">
    <top />
    <!-- <div style="width:200px; height:200px; background-color:black"> 
      haodi
    </div> -->
    <index />
  </div>
</template>

<script>
import top from './components/01.top.vue';
import index from './components/02.index.vue';
export default {
  name: 'app',
  components: {
    top,
    index
  }
};
</script>

<style >

</style>
