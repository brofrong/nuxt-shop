<script setup lang="ts">
import LeftArrow from '~/assets/svg/left-arrow.svg';
import RightArrow from '~/assets/svg/right-arrow.svg';

const params = withDefaults(defineProps<{ page: number, limit: number; total: number }>(), {
    page: 0,
    limit: 0,
    total: 0,
});
const { page, total, limit } = toRefs(params);

const emit = defineEmits(['pageChange']);


const lastPage = Math.ceil(total.value / limit.value);


function setPage(page: number) {
    emit('pageChange', page);
}

function nextPage() {
    if (page.value + 1 >= lastPage) return;
    emit('pageChange', page.value + 1);
}

function previousPage() {
    if (page.value <= 0) return;
    emit('pageChange', page.value - 1);
}

</script>


<template>
    <div class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div class="flex justify-between flex-1 sm:hidden">
            <a @click.prevent="previousPage" href="#"
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Previous</a>
            <a @click.prevent="nextPage" href="#"
                class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Next</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium">{{ limit * page + 1 }}</span>
                    to
                    <span class="font-medium">{{ limit * (page + 1) }}</span>
                    of
                    <span class="font-medium">{{ total }}</span>
                    results
                </p>
            </div>
            <div>
                <nav class="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
                    <a href="#" @click.prevent="previousPage"
                        class="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span class="sr-only">Previous</span>
                        <LeftArrow />
                    </a>
                    <a href="#" @click.prevent="setPage(0)" aria-current="page" v-if="page > 0"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">1</a>
                    <span v-if="page > 2"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                    <a href="#" @click.prevent="setPage(page - 1)" v-if="page > 1"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{{
                            page }}</a>
                    <a
                        class="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{{
                            page + 1 }}</a>
                    <a href="#" @click.prevent="setPage(page + 1)" v-if="page < lastPage - 2"
                        class="relative items-center hidden px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">{{
                            page + 2 }}</a>
                    <span v-if="page < lastPage - 2"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                    <a href="#" v-if="page < lastPage - 1" @click.prevent="setPage(lastPage - 1)"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{{
                            lastPage }}</a>
                    <a href="#" @click.prevent="nextPage"
                        class="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span class="sr-only">Next</span>
                        <RightArrow />
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>