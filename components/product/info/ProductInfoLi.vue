<script setup lang="ts">
defineProps<{
    name: string;
    value: string | number | null;
}>()
</script>

<template>
    <li class="flex items-end w-full gap-1">
        <div class="text-sm text-slate-400 whitespace-nowrap">{{ name }}</div>
        <div class="flex-grow -translate-y-1 border-b border-dotted border-slate-400"></div>
        <div class="w-1/2 whitespace-nowrap">{{ value }}</div>
    </li>
</template>
