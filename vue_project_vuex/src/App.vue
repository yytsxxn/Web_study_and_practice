<template>
  <div id="app">
      <c-header></c-header>
      <div id="content">
          <router-view></router-view>
      </div>
      <c-footer :menu="menu"></c-footer>
  </div>
</template>
<script>
import CHeader from "@/components/CHeader.vue";
import CFooter from "@/components/CFooter.vue";
import {mapMutations} from "vuex";
export default {
  data(){
    return {
       menu:[
         {
           path:"/movie",
           name:"电影",
           bgColor:"#ff0036"
         },
         {
           path:"/music",
           name:"音乐",
           bgColor:"#e9f460"
         },{
           path:"/book",
           name:"书籍",
           bgColor:"#96c2f1"
         },{
           path:"/photo",
           name:"图片",
           bgColor:"#4abce8"
         }
       ]
    }
  },
  components: {
    CHeader,
    CFooter
  },
  methods:mapMutations(["change"]),
  created () {
      let result = this.menu.filter((obj,index)=>{
        return obj.path == this.$route.path;
      });
      if(result.length){
        // 修改state中存的name color 改成result[0].name result[0].bgColor
        this.change(result[0]);
      }
  }
};
</script>
<style>
#content {
  margin: 1rem 0;
}
</style>
