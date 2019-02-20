<template>
    <div>
        <!-- 我是书籍页面 -->
        <!-- <swipe class="my-swipe">
            <swipe-item class="slide1"></swipe-item>
            <swipe-item class="slide2"></swipe-item>
            <swipe-item class="slide3"></swipe-item>
        </swipe> -->
        <slide :imgs="imgs"></slide>
    </div>
</template>

<script>
// 导入别人的组件
// require('vue-swipe/dist/vue-swipe.css');
// import 'vue-swipe/dist/vue-swipe.css';
// in ES6 modules
// import { Swipe, SwipeItem } from 'vue-swipe';

// 自己写的Slide
import Slide from '@/components/Slide.vue';
    export default {
        components: {
            // Swipe,
            // SwipeItem，
            Slide
        },
        data(){
            return {
                imgs:[
                    "https://img14.360buyimg.com/n1/s200x200_jfs/t4747/62/804815710/55498/3dcf9193/58e880e6N1ca7f917.jpg",
                    "https://img14.360buyimg.com/n1/s200x200_jfs/t9508/97/2285719018/62961/99c5b1b7/59f299b4Nc9e78adb.jpg",
                    "https://img14.360buyimg.com/n1/s200x200_jfs/t1/7311/2/7919/337148/5c09dfdcEc928c9d7/1fb356f338fd88c5.jpg",
                    "https://img11.360buyimg.com/n1/s200x200_jfs/t1/19709/14/2822/206853/5c21adb6E7c9bb79e/5b840bc23c3ed2dc.jpg"
                ],
            }
        }
    }
</script>

<style scoped>
    /* .my-swipe {
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    }

    .slide1 {
    background-color: #0089dc;
    color: #fff;
    }

    .slide2 {
    background-color: #ffd705;
    color: #000;
    }

    .slide3 {
    background-color: #ff2d4b;
    color: #fff;
    } */

</style>