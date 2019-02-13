<template>
    <div>
        <h1>我是Mine页面！！</h1>
        <router-link to='/mine/a'>A</router-link> |
        <router-link to='/mine/b'>B</router-link>
        <br>
        <h1>
            姓名：{{$route.params.name}}
            年龄：{{$route.params.age}}
        </h1>
        <router-view/>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>
