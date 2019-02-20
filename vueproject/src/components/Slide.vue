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
            <li v-for="(val,index) in imgs.length" :key="index" :class="{active:index == iNow}"></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                // imgs:[
                //     "https://img3.doubanio.com/lpic/s24468373.jpg",
                //     "https://img3.doubanio.com/lpic/s27102925.jpg",
                //     "https://img3.doubanio.com/lpic/s6989253.jpg"
                // ],
                iNow:0
            }
        },
        props:["imgs"],
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