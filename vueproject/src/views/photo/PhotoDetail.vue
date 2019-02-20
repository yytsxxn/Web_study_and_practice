<template>
    <div>
        <!-- 我是大图页面 -->
        <!-- {{$route.params.photoId}} -->

        <!-- {{photoList[$route.params.photoId]}}
        {{photoList[$route.params.photoId].src}} -->
        <router-link to="/photo" v-if="isShow">
            <!-- <div class="bg" :style="{backgroundImage:'url(' + photoList[$route.params.photoId].src + ')' }"></div> -->
            <v-touch v-on:swipeleft="next()" class="bg" :style="{backgroundImage:'url(' + photoList[iNow].src + ')' }"></v-touch>
        </router-link>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import Vue from 'vue';
import VueTouch from 'vue-touch';
Vue.use(VueTouch, {name: 'v-touch'});
    export default {
        data(){
            return {
                iNow:this.$route.params.photoId,
                isShow:false
            }
        },
        computed:{
            ...mapState(['photoList'])
        },
        created(){
            if(this.photoList.length == 0){
                this.$router.push('/photo');
            }
            else{
                this.isShow = true;
            }
        },
        methods:{
            next(){
                this.iNow++;
            }
        }
    }
</script>

<style scoped>
    .bg{
        position: absolute;
        top:1rem;
        left:0px;
        bottom: 1rem;
        right:0px;
        background: #000 no-repeat center center;
        background-size: contain;   
    }

</style>