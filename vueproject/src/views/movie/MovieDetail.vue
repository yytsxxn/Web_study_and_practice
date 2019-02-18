<template>
    <div class="detail">
        <!-- 我是电影详情页 -->
        <img :src="imgSrc"/>
        {{$route.params.movieId}}
        <span class="title"> {{movieDetail.title}} </span>
    </div>
</template>

<script>
import Axios from 'axios'
    export default {
        data(){
            return {
                movieDetail:{},
                imgSrc:""
            }
        },
        created () {
            Axios.get("/data/moviedetail.json")
            .then((result)=>{
                console.log(result.data);
                this.movieDetail = result.data;
                this.imgSrc = this.movieDetail.images.small;
                console.log(this.movieDetail.images.small)
            }).catch(()=>{

            })
        }
    }
</script>

<style scoped>
    img{
        width: 2.5rem;
    }

</style>