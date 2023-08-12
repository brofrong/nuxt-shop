<script setup lang="ts">
import { FetchResult } from 'nuxt/dist/app/composables/fetch';
import StarComponent from '~/assets/svg/star.svg?component';

const { product } = defineProps<{ product: FetchResult<'/api/products', 'get'>['products'][number] }>();

const priceWithDiscount = Math.round(product.price - (product.price * (product.discountPercentage || 0) / 100));

</script>

<template>
    <div>
        <div class="rounded bg-slate-100">
            <!-- По хорошему нужно вынести значения breakpoint'ов в vue, что бы можно было с помощью v-if не рендерить не нужный компонент -->
            <ImagePreview class="hidden sm:block" :images="product.images.map(img => img.url)" />
            <ImageCarousel class="block sm:hidden" :images="product.images.map(img => img.url)" />
        </div>
        <div class="flex items-end gap-2 mb-1">
            <div class="font-bold">{{ priceWithDiscount }} $</div>
            <div class="text-sm line-through text-slate-600">{{ product.price }} $</div>
            <div class="text-sm text-red-600">-{{ product.discountPercentage }}%</div>
        </div>
        <h3 class="mb-1 overflow-hidden text-2xl whitespace-nowrap overflow-ellipsis">{{ product.title }}</h3>

        <div class="flex items-center mb-4">
            <StarComponent class="w-4 h-4 fill-yellow-400" />
            <div class="text-sm text-slate-600">{{ product.rating }}</div>
        </div>

        <NuxtLink :to="`product/${product.id}`"
            class="block w-full px-4 py-2 text-center text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700">
            Купить
        </NuxtLink>

    </div>
</template>