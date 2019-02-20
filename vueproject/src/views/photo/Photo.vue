<template>
    <div class="photo">
        <!-- 我是图片页面 -->
        <img v-for="(photoSrc,index) in photo" :key="index" :src="photoSrc.src" @click="goDetail"/>
    </div>
</template>

<script>
import Axios from 'axios'
    export default {
        data(){
            return {
                photo:[]
            }
        },
        created(){
            Axios.get("/data/photodata.json")
            .then((result)=>{
                this.photo = [...result.data.photoData];
            })
        },
        methods:{
            goDetail(){
                this.$router.push("/photoDetail")
            }
        }
    }
</script>

<style scoped>
    .photo img{
        width: 50%;
        height: 2rem;
    }

</style>