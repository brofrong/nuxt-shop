<script setup lang="ts">

const filter = ref({
    page: 0
});

const { data, pending, refresh, error } = await useFetch('/api/products', {
    query: filter,
    onRequest: () => {
        if (process.client) window?.scroll({ top: 0 });
    }
});

function changePage(pageNumber: number) {
    filter.value.page = pageNumber;
}

</script>

<template>
    <div class="container p-4 m-auto">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <ProductCard v-if="!pending" :key="item.id" :product="item" v-for="item in data?.products" />
            <ProductCardSkeleton v-if="pending || error" v-for="item in Array.from(Array(10).keys())" />
        </div>
        <div v-if="!data?.products.length && !pending && !error" class="m-8 text-3xl font-bold text-center">
            Товаров нет
        </div>
        <Pagination @page-change="changePage" :limit="data?.limit" :page="filter?.page" :total="data?.total" />
    </div>
</template>
  