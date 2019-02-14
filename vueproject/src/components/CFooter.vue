<template>
    <div class="footer">
        <ul>
            <li>电影</li>
            <li>音乐</li>
            <li>图片</li>
            <li>电影</li>
        </ul>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .footer{
        background: rgb(160, 7, 7);
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        width: 100%;
        position: fixed;
        bottom: 0;
    }
    /* 弹性盒模型 [将底部的文字横成一排]*/
    .footer ul{
         display: flex;
    }
    li{
        flex-grow: 1;
        text-align: center;
        color: white;
    }
</style>