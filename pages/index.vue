<script setup lang="ts">
const { data, pending, refresh } = await useFetch('/api/products');
</script>
<template>
    <div>
        <h1 class="text-3xl font-bold text-center uppercase">Hello Nuxt</h1>
        <p>{{ data }}</p>
        <p>{{ pending }}</p>
        <button @click="refresh()">refresh</button>
    </div>
</template>
  