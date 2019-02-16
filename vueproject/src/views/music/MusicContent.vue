<template>
    <div>
        <aplayer :music="{
            /*title: '我要你',
            artist: '老狼',
            src: 'http://up.mcyt.net/down/43422.mp3',
            pic: 'http://omratag7g.bkt.clouddn.com/%E6%88%91%E8%A6%81%E4%BD%A0.jpg'*/
            title: '我要你',
            artist: '老狼',
            src: 'http://up.mcyt.net/down/43422.mp3',
            pic: 'http://omratag7g.bkt.clouddn.com/%E6%88%91%E8%A6%81%E4%BD%A0.jpg'
        }"/>
    </div>
</template>

<script>
import Aplayer from 'vue-aplayer';
    export default {
        components:{
            Aplayer
        },
        created () {
            
        }
    }
</script>

<style scoped>

</style>