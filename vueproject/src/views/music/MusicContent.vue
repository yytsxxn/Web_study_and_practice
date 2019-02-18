<template>
    <div>
        <!-- <aplayer :music="{
            title: '我要你',
            artist: '老狼',
            src: 'http://up.mcyt.net/down/43422.mp3',
            pic: 'http://omratag7g.bkt.clouddn.com/%E6%88%91%E8%A6%81%E4%BD%A0.jpg'
        }" :list="list"/> -->
        <aplayer :music=list[0] :list="list" v-if="isShow" showLrc/>
    </div>
</template>

<script>
import Aplayer from 'vue-aplayer';
import Axios from 'axios';
    export default {
        data(){
            return{
                list:[],
                isShow:false
            }
        },
        components:{
            Aplayer
        },
        created () {
            Axios.get('/data/musicdata.json')
            .then((result)=>{
                result.data.musicData.forEach(obj => {
                    let obj1 = {
                        title:obj.title,
                        artist:obj.author,
                        src:obj.src,
                        pic:obj.musicImgSrc,
                        lrc:`http://localhost:8080/${obj.lrc}`
                    }
                    this.list.push(obj1);
                });
                console.log(this.list);
                this.isShow = true;
            })
            .catch();
        }
    }
</script>

<style scoped>

</style>