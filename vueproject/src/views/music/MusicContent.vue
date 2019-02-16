<template>
    <div>
        <aplayer :music="{
            title: 'secret base~君がくれたもの~',
            artist: 'Silent Siren',
            src: 'http://up.mcyt.net/md5/53/OTk1MDE2NA_Qq4329912.mp3',
            pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
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