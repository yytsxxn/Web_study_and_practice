<template>
    <div>
        <header :style="{background: hbgc}">
            <span class="goHome">首页</span>
            电影
        </header>
    </div>
</template>

<script>
    export default {
        props:["hbgc"]
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