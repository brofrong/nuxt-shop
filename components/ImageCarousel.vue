<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

const { images } = defineProps<{ images: string[] }>();

const currentImgIndex = ref(0);

</script>

<template>
    <div class="relative w-full h-full">
        <Swiper loop @real-index-change="(e) => currentImgIndex = e.realIndex">
            <SwiperSlide v-for="img, index in  images ">
                <img :class="'object-scale-down object-center m-auto mb-2 h-80'" :src="img">
            </SwiperSlide>
        </Swiper>

        <div class="absolute flex gap-2 -translate-x-1/2 -bottom-3 left-1/2">
            <div v-for="img, index in images"
                :class="twMerge('w-2 h-2 rounded-full bg-slate-400', currentImgIndex === index && 'bg-blue-600')"></div>
        </div>
    </div>
</template>