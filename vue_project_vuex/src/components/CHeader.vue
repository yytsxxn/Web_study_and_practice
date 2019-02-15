<template>
    <div>
        <header :style="{background:color}">
            <span class="goHome">首页</span>
            {{name}}
        </header>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
       computed: mapState(["color","name"])
    }
</script>

<style scoped>
    header{
        height:1rem;
        background: #ff0036;
        text-align: center;
        position: fixed;
        top:0px;
        left:0;
        width:100%;
        line-height: 1rem;
        color: #fff;
    }
    .goHome{
        position: absolute;
        left:0.1rem;
        top:50%;
        transform: translateY(-50%);
    }
    
</style>