<script setup lang="ts">

const { currentRoute } = useRouter();

const { isOpen, setOpen, shopItems, clearCart } = useShoppingCart();

const totalPrice = computed(() => shopItems.value.reduce((acc, it) => acc + it.price, 0))
const totalPriceWithDiscount = computed(() => shopItems.value.reduce((acc, it) => acc + it.price - (it.price * (it.discountPercentage || 0) / 100), 0))


// скрыть боковое меню при переходе на другую страницу
watch(currentRoute, () => setOpen(false));

function beforeLeave(el) {
    const { marginTop } = window.getComputedStyle(el);
    el.style.top = `${el.offsetTop - parseFloat(marginTop)}px`;
}

</script>

<template>
    <Transition>
        <div v-click-outside="() => setOpen(false)" v-if="isOpen"
            class="fixed right-0 z-30 flex flex-col max-h-[calc(100vh_-_64px)] h-[calc(100vh_-_64px)] gap-4 p-4 bg-blue-600 top-16 bg-opacity-90 backdrop-blur-md w-screen sm:w-96">
            <h3 class="text-2xl font-bold text-white">Shopping Cart</h3>
            <div class="flex items-end gap-1">
                <span class="text-white">Total Price</span>
                <div class="flex-grow border-b border-dotted border-slate-300"></div>
                <span class="text-white text-red-400 line-through">{{ totalPrice }}$</span>
            </div>
            <div class="flex items-end gap-1">
                <span class="text-white">Price With Discount</span>
                <div class="flex-grow border-b border-dotted border-slate-300"></div>
                <span class="text-green-400">{{ Math.round(totalPriceWithDiscount) }}$</span>
            </div>
            <div class="flex items-end gap-1">
                <span class="text-white">Saved</span>
                <div class="flex-grow border-b border-dotted border-slate-300"></div>
                <span class="text-sm text-slate-300">{{ totalPrice - Math.round(totalPriceWithDiscount) }}$</span>
            </div>
            <button @click="clearCart"
                class="flex items-center justify-center block w-full px-4 py-2 text-center text-white transition-colors bg-red-600 rounded-xl hover:bg-red-700 fill-white"
                v-if="shopItems.length">Clear cart</button>
            <div class="flex-grow -mx-4 overflow-x-hidden overflow-y-auto">
                <TransitionGroup @before-leave="beforeLeave" name="list" tag="div"
                    class="relative flex flex-col h-full gap-4 px-4 overflow-visible">
                    <ShoppingCartProductCard :key="product.id" v-for="product in shopItems" :product="product" />
                </TransitionGroup>
            </div>
            <div v-if="!shopItems.length" class="text-xl font-bold text-center text-white">Shopping cart is empty</div>
        </div>
    </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: all 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
    transform: translateX(100%);
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translate(150%);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
</style>
