<script setup lang="ts">
import ShoppingBagIcon from '~/assets/svg/shopping-bag.svg?component';

const { isOpen, setOpen, shopItemsCount } = useShoppingCart();
</script>
<template>
    <div class="relative" @click="setOpen(!isOpen)">
        <ShoppingBagIcon class="w-10 h-10 fill-white" />
        <div
            class="absolute bottom-0 right-0 w-5 h-5 text-xs leading-5 text-center align-middle bg-red-600 rounded-full select-none">
            <span>{{ shopItemsCount }}</span>
        </div>
    </div>
</template>