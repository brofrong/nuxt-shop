<script setup lang="ts">
import DeleteIcon from '~/assets/svg/delete.svg?component';
import EditIcon from '~/assets/svg/edit.svg?component';

const router = useRouter();

const route = useRoute();
const { data: product, error } = useFetch('/api/product', { query: { id: route.params.id } });

function deleteProduct() {
    $fetch('/api/product', { query: { id: product.value?.id }, method: "DELETE", onResponse: () => { router.push('/') } });
}

</script>

<template>
    <div class="container p-4 m-auto">
        <div v-if="product" class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
            <div class="rounded bg-slate-100">
                <!-- По хорошему нужно вынести значения breakpoint'ов в vue, что бы можно было с помощью v-if не рендерить не нужный компонент -->
                <ImagePreview class="hidden sm:block" :images="product.images.map(img => img.url)" />
                <ImageCarousel class="block sm:hidden" :images="product.images.map(img => img.url)" />
            </div>
            <div class="col-span-2">
                <div class="flex items-center justify-between">
                    <h2 class="mb-6 text-2xl font-bold">{{ product.title }}</h2>
                    <div class="flex items-center gap-4">
                        <NuxtLink :to="`/product/create?id=${product.id}`">
                            <EditIcon class="w-6 h-6 hover:fill-green-600" />
                        </NuxtLink>
                        <button @click="deleteProduct">
                            <DeleteIcon class="w-6 h-6 hover:fill-red-400" />
                        </button>
                    </div>
                </div>
                <ProductInfo :product="product" />
            </div>
        </div>
        <div>
            <h3 class="text-2xl font-bold">Description</h3>
            <p> {{ product?.description }}</p>
        </div>
    </div>
</template>