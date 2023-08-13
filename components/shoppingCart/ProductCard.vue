<script setup lang="ts">
import { ShoppingCartProduct } from 'composables/useShoppingCart';
import DeleteIcon from '~/assets/svg/delete.svg?component';

const { product } = defineProps<{ product: ShoppingCartProduct }>();

const { removeItem } = useShoppingCart();

const priceWithDiscount = Math.round(product.price - (product.price * (product.discountPercentage || 0) / 100));

</script>

<template>
    <div class="flex gap-4 p-4 bg-white rounded shadow">
        <div class="flex-shrink-0">
            <NuxtLink :to="`/product/${product.id}`">
                <img :alt="product.title" :class="'object-scale-down object-center m-auto mb-2 h-12 w-12'"
                    :src="product.thumbnail">
            </NuxtLink>
        </div>
        <div class="flex-grow overflow-hidden">
            <NuxtLink :to="`/product/${product.id}`">
                <h3 class="text-sm font-bold transition-colors whitespace-nowrap overflow-ellipsis hover:text-green-400">{{
                    product.title }}</h3>
            </NuxtLink>
            <div class="flex items-end gap-2 mb-1">
                <div class="font-bold">{{ priceWithDiscount }} $</div>
                <div class="text-sm line-through text-slate-600">{{ product.price }} $</div>
                <div class="text-sm text-red-600">-{{ product.discountPercentage }}%</div>
            </div>
        </div>
        <DeleteIcon class="flex-shrink-0 w-6 h-6 transition-colors cursor-pointer hover:fill-red-600"
            @click="removeItem(product.id)" />
    </div>
</template>
