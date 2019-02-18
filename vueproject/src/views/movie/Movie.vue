<template>
    <div>
        <!-- 我是电影页面 -->
        <ul class="container">
            <!-- <li>
                <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2545472803.jpg" alt="">
                <div class="intro">
                    <h3>流浪地球</h3>
                    <p>屈楚萧</p>
                    <p>1005152已观看</p>
                    <p>年份：2019</p>
                    <p>科幻/灾难</p>
                </div>
            </li> -->
            <li v-for="(obj,index) in movieList" :key="index" @click="goDetail(obj.id)"> 
                <img :src="obj.images.small" alt="">
                <!-- <img :src="obj.images.small" alt=""> -->
                <div class="intro">
                    <h4>{{obj.title}}</h4>
                    <p>
                        <span v-for="(actors,index) in obj.casts" :key="index">
                            {{actors.name}} |
                        </span>
                    </p>
                    <p>{{obj.collect_count}}人已观看</p>
                    <p>年份:{{obj.year}}</p>
                    <p>
                        <span v-for="(types,index) in obj.genres" :key="index">
                            {{types}}
                        </span>
                    </p>
                </div>
            </li>
        </ul>
        <img class="loading" v-show="imgFlag" src="@/assets/img/loading.gif">
        <div class="bottom" v-show = "bottomFlag">到底了</div>
    </div>
</template>

<script>
import Axios from 'axios';
    export default {
        data(){
            return {
                movieList:[],
                imgFlag:false,
                bottomFlag:false
            }
        },
        created(){
            this.movieRequest();
            window.onscroll = () => {
                // 滚动条滚动的高度
                // console.log(document.documentElement.scrollTop);
                // 可视区的高度
                // console.log(document.documentElement.clientHeight);
                // 整个滚动区的高度
                // console.log(document.documentElement.scrollHeight);
                if( (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight) < 1 && !this.bottomFlag){
                    this.movieRequest();
                }
            }
        },
        methods:{
            movieRequest(){
                this.imgFlag = true;
                // 豆瓣接口 跨域访问
                // Axios.get("https://bird.ioliu.cn/v1?url=https://api.douban.com/v2/movie/in_theaters?city=广州&start="+this.movieList.length+"&count=10")
                // 本地模拟接口
                Axios.get("/movie"+this.movieList.length+".json")
                .then((result)=>{
                //     console.log(result);
                // this.movieList = result.data.subjects;
                    this.movieList = [...this.movieList,...result.data.subjects];
                    this.imgFlag = false;
                    if(this.movieList.length == result.data.total){
                        this.bottomFlag = true;
                    }
                })
                .catch();    
            },
            goDetail(id){
                this.$router.push('/movieDetail/'+ id);
            }
        }
    }
</script>

<style scoped>
    .container{
        padding: 0.2rem;
    }
    li{
        display: flex;
        border-bottom: 1px solid #000;
    }
    li img{
        width: 2rem;
        height: 2.8rem;
        margin: 0.1rem 0;
    }
    .intro{
        flex-flow: 1;
        margin-left: 0.3rem;
    }
    .loading{
        width: 3rem;
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .bottom{
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.4rem;
        text-align: center;
    }
</style>