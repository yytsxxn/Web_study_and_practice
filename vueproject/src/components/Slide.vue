<template>
    <div class="slide-wraper">
        <ul class="slide">
            <transition-group name="fade">
                <li v-for="(imgSrc,index) in imgs" :key="index" v-show="index == iNow">
                    <img :src="imgSrc"/>
                </li>
            </transition-group>
        </ul>
        <ul class="btns">
            <li v-for="(i,index) in imgs.length" :key="index" :class="{active:index == iNow}"></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                imgs:[
                    "https://img14.360buyimg.com/n1/s200x200_jfs/t4747/62/804815710/55498/3dcf9193/58e880e6N1ca7f917.jpg",
                    "https://img14.360buyimg.com/n1/s200x200_jfs/t9508/97/2285719018/62961/99c5b1b7/59f299b4Nc9e78adb.jpg",
                    "https://img14.360buyimg.com/n1/s200x200_jfs/t1/7311/2/7919/337148/5c09dfdcEc928c9d7/1fb356f338fd88c5.jpg",
                    "https://img11.360buyimg.com/n1/s200x200_jfs/t1/19709/14/2822/206853/5c21adb6E7c9bb79e/5b840bc23c3ed2dc.jpg"
                ],
                iNow:0
            }
        },
        created(){
            setInterval(() => {
                this.iNow++;
                if(this.iNow == this.imgs.length){
                    this.iNow = 0;
                }
            }, 2000);
        }
    }
</script>

<style scoped>
    .slide li{
        width: 100%;
        position: absolute;
        left: 0;
        top: 1rem;
    }
    .slide img{
        height: 5rem;
        width: 100%;
    }
    .btns{
        position: absolute;
        top: 5.5rem;
        left: 50%;
        transform: translateX(-50%);
    }
    .btns li{
        width:0.2rem;
        height:0.2rem;
        background: rgb(236, 85, 204);
        border-radius: 50%;
        float: left;
        margin-right:0.1rem;
    }
    .btns li.active{
        background: rgb(57, 152, 207);
    }
    .fade-enter{
        transform: translateX(100%)
    }
    .fade-enter-active{
        transition: transform 1s ease;
    }
    .fade-enter-to{
        transform: translateX(0)
    }
    .fade-leave{
        transform: translateX(0)
    }
    .fade-leave-active{
        transition: transform 1s ease;
    }
    .fade-leave-to{
        transform: translateX(-100%)
    }


</style>