<template>
    <div class="photo">
        <!-- 我是图片页面 -->
        <img v-for="(photoSrc,index) in $store.state.photoList" :key="index" :src="photoSrc.src" @click="goDetail(index)"/>
    </div>
</template>

<script>
import Axios from 'axios'
    export default {
        // data(){
        //     return {
        //         photo:[]
        //     }
        // },
        created(){
            Axios.get("/data/photodata.json")
            .then((result)=>{
                // this.photo = [...result.data.photoData];
                this.$store.commit('addPhoto',result.data.photoData);
            })
        },
        methods:{
            goDetail(photoId){
                this.$router.push("/photoDetail/"+photoId)
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