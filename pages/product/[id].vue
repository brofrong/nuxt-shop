<script setup lang="ts">
import { FetchResult } from 'nuxt/app';
import DeleteIcon from '~/assets/svg/delete.svg?component';
import EditIcon from '~/assets/svg/edit.svg?component';
import DeleteComponent from '~/assets/svg/delete.svg?component';

const router = useRouter();
const route = useRoute();

function setSeo(product: FetchResult<'/api/product', 'get'>) {
    if (!product) return;
    useHead({
        title: `Nuxt Shop - ${product.title}`,
        meta: [
            { name: 'description', content: `Fake shop site, created for technical task. Fake product description: ${product.description}` },
        ],
    });

    useSeoMeta({
        title: `Nuxt Shop - ${product.title}`,
        ogTitle: `Nuxt Shop - ${product.title}`,
        description: `Fake shop site, created for technical task. Fake product description: ${product.description}`,
        ogDescription: `Fake shop site, created for technical task. Fake product description: ${product.description}`,
        ogImage: product.thumbnail,
        twitterCard: 'summary_large_image',
        ogUrl: 'https://nuxt-shop-brofrong.vercel.app/'
    });
}

const { data: product, error } = useFetch('/api/product', {
    query: { id: route.params.id },
    onResponse: (response) => setSeo(response.response._data),
});

watch(product, () => product.value && setSeo(product.value), { immediate: true });

watch(error, () => { if (error.value?.statusCode === 404) throw createError({ statusCode: 404, statusMessage: 'Page Not Found' }) }, { immediate: true });

function deleteProduct() {
    $fetch('/api/product', { query: { id: product.value?.id }, method: "DELETE", onResponse: () => { navigateTo('/') } });
}

const { addItem, shopItems, removeItem } = useShoppingCart();

const isInShoppingCart = computed(() => shopItems.value.some((it) => it.id === product.value?.id));

</script>

<template>
    <div v-if="product" class="container p-4 m-auto">
        <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
            <div class="rounded bg-slate-100">
                <!-- По хорошему нужно вынести значения breakpoint'ов в vue, что бы можно было с помощью v-if не рендерить не нужный компонент -->
                <ImagePreview :alt="product.title" class="hidden sm:block" :images="product.images.map(img => img.url)" />
                <ImageCarousel :alt="product.title" class="block sm:hidden" :images="product.images.map(img => img.url)" />
            </div>
            <div class="col-span-2">
                <div class="flex items-center justify-between">
                    <h2 class="mb-6 text-2xl font-bold">{{ product.title }}</h2>
                    <div class="flex items-center gap-4">
                        <NuxtLink :to="`/create?id=${product.id}`">
                            <EditIcon class="w-6 h-6 hover:fill-green-600" />
                        </NuxtLink>
                        <button @click="deleteProduct">
                            <DeleteIcon class="w-6 h-6 hover:fill-red-400" />
                        </button>
                    </div>
                </div>
                <div class="mb-4">
                    <ProductInfo :product="product" />
                </div>
                <button v-if="!isInShoppingCart" @click="addItem(product)"
                    class="block w-full px-4 py-2 text-center text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700">
                    Buy
                </button>
                <button v-else @click="removeItem(product.id)"
                    class="flex items-center justify-center block w-full px-4 py-2 text-center text-white transition-colors bg-red-600 rounded-xl hover:bg-red-700 fill-white">
                    <DeleteComponent class="w-5 h-5 mr-1" />
                    <div>Delete from cart</div>
                </button>
            </div>
        </div>
        <div>
            <h3 class="text-2xl font-bold">Description</h3>
            <p> {{ product?.description }}</p>
        </div>
    </div>
    <div class="container p-4 m-auto animate-pulse" v-else>
        <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
            <div class="w-full rounded aspect-square bg-slate-400"></div>
            <div class="col-span-2">
                <div class="w-1/4 h-8 mb-4 bg-slate-400"></div>
                <div class="w-1/2 h-4 mb-4 bg-slate-400"></div>
                <div class="w-1/2 h-4 mb-4 bg-slate-400"></div>
                <div class="w-1/2 h-4 mb-4 bg-slate-400"></div>
                <div class="w-1/2 h-4 mb-4 bg-slate-400"></div>
                <div class="w-1/2 h-4 mb-4 bg-slate-400"></div>
                <div class="w-1/2 h-4 mb-4 bg-slate-400"></div>
                <div class="w-1/2 h-4 mb-4 bg-slate-400"></div>
                <div class="w-1/2 h-4 mb-4 bg-slate-400"></div>
                <div class="w-full h-8 mb-4 bg-slate-400"></div>
            </div>
        </div>
    </div>
</template>