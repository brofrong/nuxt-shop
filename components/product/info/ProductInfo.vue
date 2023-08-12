<script setup lang="ts">
import { FetchResult } from 'nuxt/app';

const { product } = defineProps<{ product: FetchResult<'/api/product', 'get'> }>();

</script>
<template>
    <h3 class="text-xl font-bold text-slate-600">About product</h3>
    <ul class="w-full">
        <ProductInfoLi name="Brand" :value="product.brand" />
        <ProductInfoLi name="Category" :value="product.category" />
        <ProductInfoLi name="Price" :value="product.price" />
        <ProductInfoLi name="Rating" :value="product.rating" />
        <ProductInfoLi name="Stock" :value="product.stock" />
    </ul>
</template>