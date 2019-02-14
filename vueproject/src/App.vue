<template>
  <div id="app">
      <c-header :hbgc="hbgc"></c-header>
      <div id="content">
          <router-view></router-view>
      </div>
      <c-footer :menu="menu" @changeHeaderColor="headerColor"></c-footer>
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
          bgColor:"rgb(196,109,123)"
        },
        {
          path:"/music",
          name:"音乐",
          bgColor:"rgb(177,106,24)"
        },{
          path:"/book",
          name:"书籍",
          bgColor:"rgb(102,105,9)"
        },{
          path:"/photo",
          name:"图片",
          bgColor:"rgb(242,85,52)"
        }
      ],
      hbgc:""
    }
  },
  components: {
    CHeader,
    CFooter
  },
  methods:{
    headerColor(bg){
      console.log(bg);
      this.hbgc = bg;
    }
  }
};
</script>
<style>
#content {
  margin: 1rem 0;
}
</style>

