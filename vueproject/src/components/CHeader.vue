<template>
    <header>
        <span class="goHome">
            首页
        </span>
        电影
    </header>
    
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    header{
        background: rgb(160, 7, 7);
        height: 1rem;
        line-height: 1rem;
        font-size: 0.5rem;
        text-align: center;
        color: white;
        position: fixed;
        width: 100%;
    }
    .goHome{
        position: absolute;
        font-size: 0.3rem;
        left: 0.1rem;
        top: 50%;
        transform: translateY(-50%);
    }
</style>