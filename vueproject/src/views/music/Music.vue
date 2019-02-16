<template>
    <div>
        <!-- 我是音乐页面 -->
        <div>
            <img v-for="(obj,index) in music" :key="index" :src="obj.bg" @click="goContent"/>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
    export default {
        data(){
            return {
                music:[]
            }
        },
        created(){
            Axios.get("/data/musiclist.json")
            .then((result)=>{
                this.music = result.data.albums;
            })
            .catch();
        },
        methods:{
            goContent(){
                this.$router.push("/musicContent");
            }
        }
    }
</script>

<style scoped>
    img{
       width: 50%;
    }

</style>