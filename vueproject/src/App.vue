<template>
  <div id="app">
      <c-header :obj="obj"></c-header>
      <div id="content">
          <router-view></router-view>
      </div>
      <c-footer :menu="menu" @changeHeader="headerChange" :obj="obj"></c-footer>
  </div>
</template>
<script>
import CHeader from "@/components/CHeader.vue";
import CFooter from "@/components/CFooter.vue";
export default {
  data(){
    return {
      menu:[
        {
          path:"/movie",
          name:"电影",
          bgColor:"rgb(169,7,7)"
        },
        {
          path:"/music",
          name:"音乐",
          bgColor:"rgb(177,106,24)"
        },
        {
          path:"/book",
          name:"书籍",
          bgColor:"rgb(102,105,9)"
        },
        {
          path:"/photo",
          name:"图片",
          bgColor:"rgb(242,85,52)"
        },
      ],
      obj:{
        path:"/movie",
        name:"电影",
        bgColor:"rgb(169,7,7)"
      }
    }
  },
  components: {
    CHeader,
    CFooter
  },
  methods:{
    headerChange(obj){
      this.obj = obj;
    }
  },
  created(){
    console.log(this.$route.path);
    let result = this.menu.filter((obj,index)=>{
      return obj.path == this.$route.path;
    });
    if(result.length){
      this.obj = result[0];
    }
  }
};
</script>
<style>
#content {
  margin: 1rem 0;
}
</style>