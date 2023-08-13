<script setup lang="ts">
import { FetchResult } from 'nuxt/dist/app/composables/fetch';
import StarComponent from '~/assets/svg/star.svg?component';
import DeleteComponent from '~/assets/svg/delete.svg?component';

const { product } = defineProps<{ product: FetchResult<'/api/products', 'get'>['products'][number] }>();

const priceWithDiscount = Math.round(product.price - (product.price * (product.discountPercentage || 0) / 100));

const { addItem, shopItems, removeItem } = useShoppingCart();

const isInShoppingCart = computed(() => shopItems.value.some((it) => it.id === product.id));

</script>

<template>
    <div>
        <NuxtLink :to="`product/${product.id}`" class="block rounded bg-slate-100">
            <!-- По хорошему нужно вынести значения breakpoint'ов в vue, что бы можно было с помощью v-if не рендерить не нужный компонент -->
            <ImagePreview :alt="product.title" class="hidden sm:block" :images="product.images.map(img => img.url)" />
            <ImageCarousel :alt="product.title" class="block sm:hidden" :images="product.images.map(img => img.url)" />
        </NuxtLink>
        <div class="flex items-end gap-2 mb-1">
            <div class="font-bold">{{ priceWithDiscount }} $</div>
            <div class="text-sm line-through text-slate-600">{{ product.price }} $</div>
            <div class="text-sm text-red-600">-{{ product.discountPercentage }}%</div>
        </div>
        <NuxtLink :to="`product/${product.id}`">
            <h3
                class="mb-1 overflow-hidden text-2xl transition-colors whitespace-nowrap overflow-ellipsis hover:text-green-400">
                {{
                    product.title }}</h3>
        </NuxtLink>

        <div class="flex items-center mb-4">
            <StarComponent class="w-4 h-4 fill-yellow-400" />
            <div class="text-sm text-slate-600">{{ product.rating }}</div>
        </div>

        <button v-if="!isInShoppingCart" @click="addItem(product)"
            class="block w-full px-4 py-2 text-center text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700">
            Buy
        </button>
        <button v-else @click="removeItem(product.id)"
            class="flex items-center justify-center block w-full px-4 py-2 text-center text-white transition-colors bg-red-600 rounded-xl hover:bg-red-700 fill-white">
            <DeleteComponent class="w-5 h-5 mr-1" />
            <div>Delete</div>
        </button>

    </div>
</template>