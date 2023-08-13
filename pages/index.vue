<script setup lang="ts">
import { ProductFilterType } from 'components/product/ProductFilter.vue';
import { ProductsInput, productsInputSchema } from '~/server/input-schemas/products.input';
import MenuIcon from '~/assets/svg/menu.svg?component';

const route = useRoute();
const router = useRouter();

const query = productsInputSchema.partial().parse(route.query);

const filter = ref<ProductsInput>({
    page: query.page || 0,
    minPrice: query.minPrice || 0,
    maxPrice: query.maxPrice || Infinity,
    rating: query.rating || 0,
    stock: query.stock || 0,
    brand: query.brand,
    category: query.category,
    description: query.description,
    title: query.title
});

const isOpenFilterModal = ref(false);

const { data, pending, refresh, error } = await useFetch('/api/products', { query: filter });

function updateFilter(updateData: ProductFilterType) {
    filter.value = Object.assign(filter.value, updateData);
    navigateTo({ path: '/', query: filter.value, replace: false })
}

function changePage(pageNumber: number) {
    filter.value.page = pageNumber;
    if (process.client) window?.scroll({ top: 0 });
}

</script>

<template>
    <div class="container relative p-4 m-auto">
        <div class="flex justify-end mb-4 sm:hidden">
            <MenuIcon @click="isOpenFilterModal = true" class="w-12 h-12" />
        </div>
        <Modal :is-open="isOpenFilterModal" @close="isOpenFilterModal = false">
            <ProductFilter :initial-value="filter" @filter="updateFilter" />
        </Modal>

        <div class="mb-4 sm:grid sm:grid-cols-4 sm:gap-4">
            <aside class="hidden h-full sm:block sm:relative">
                <ProductFilter :initial-value="filter" @filter="updateFilter" class="w-full sm:sticky top-4" />
            </aside>
            <div class="col-span-3">
                <ProductCards :data="data" :error="error" :pending="pending" />
            </div>
        </div>
        <Pagination @page-change="changePage" :limit="data?.limit" :page="filter?.page" :total="data?.total" />
    </div>
</template>
  