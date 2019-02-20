<template>
    <div>
        <header :style="{background:obj.bgColor}">
            <span class="goHome" @click="goHome">首页</span>
            {{obj.name}}
        </header>
    </div>
</template>

<script>
    export default {
        props:["obj"],
        methods:{
            goHome(){
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
    header{
        background: rgb(169,7,7);
        height:1rem;
        line-height: 1rem;
        text-align: center;
        font-size: 0.5rem;
        color: #fff;
        position: fixed;
        top:0;
        width:100%;
        
    }
    .goHome{
        font-size: 0.3rem;
        position: absolute;
        left:0.1rem;
        top:50%;
        transform: translateY(-50%);
    }
    
</style>