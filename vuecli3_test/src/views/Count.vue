<template>
    <div>
        <h1>我是count页面</h1>
        <p>
            {{$store.state.count}}
        </p>
        <button @click="$store.commit('add',2)">add</button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>