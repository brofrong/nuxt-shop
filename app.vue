<script setup lang="ts">
const route = useRoute()
</script>

<template>
    <nav class="flex gap-6 p-4 text-white bg-blue-600 align-center">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/create">Create</NuxtLink>
    </nav>
    <NuxtLoadingIndicator />
    <NuxtPage />
</template>