<template>
    <div class="footer" :style="{background:bg}">
        <ul>
            <!-- <li><router-link to="./movie">电影</router-link></li>
            <li><router-link to="./music">音乐</router-link></li>
            <li><router-link to="./book">书籍</router-link></li>
            <li><router-link to="./photo">图片</router-link></li> -->
            <li v-for="(obj,index) in menu" :key="index">
                <router-link :to="obj.path" @click.native="change(obj)">{{obj.name}}</router-link>
            </li>
        </ul> 
    
    </div>
</template>

<script>
    export default {
        data(){
            return {
                bg:''
            }
        },
        props:["menu"],
        methods:{
            change(obj){
                this.bg = obj.bgColor;
                this.$emit('changeHeaderColor',this.bg);
            }
        }
    }
</script>

<style scoped>
    .footer{
        background: rgb(160, 7, 7);
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: 0.3rem;
        width: 100%;
        position: fixed;
        bottom: 0;
    }
    /* 弹性盒模型 [将底部的文字横成一排] */
    .footer ul{
         display: flex;
    }
    li{
        flex-grow: 1;
        text-align: center;
        font-size: 0.3rem;
    }
    .footer a{
        color: #000;
        outline:none;
    }
    .footer a.router-link-active{
        color: #fff;
    }
</style>