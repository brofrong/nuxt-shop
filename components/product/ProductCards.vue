<script setup lang="ts">
import { FetchResult } from 'nuxt/app';

const { data, pending, error } = defineProps<{ data: FetchResult<'/api/products', 'get'> | null, pending?: boolean, error?: any }>();
</script>

<template>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <ProductCard v-if="!pending" :key="item.id" :product="item" v-for="item in data?.products" />
        <ProductCardSkeleton v-if="pending || error" v-for="item in Array.from(Array(10).keys())" />
    </div>
    <div v-if="!data?.products.length && !pending && !error" class="m-8 text-3xl font-bold text-center">
        Товаров нет
    </div>
</template>