<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

const { images } = defineProps<{ images: string[] }>();

const currentImgIndex = ref(0);

function mousemove(e: MouseEvent) {
    const targetWidth = (e.currentTarget as HTMLDivElement).clientWidth;
    const x = e.clientX - (e.currentTarget as HTMLDivElement).offsetLeft;
    const numberOfElements = images.length;

    if (x < 0) return;

    const toShow = Math.floor(x / (targetWidth / numberOfElements));

    currentImgIndex.value = toShow;
}

function mouseleave() {
    currentImgIndex.value = 0;
}

</script>

<template>
    <div class="relative w-full h-full" @mousemove="mousemove" @mouseleave="mouseleave">
        <img v-for="img, index in  images "
            :class="twMerge('object-scale-down object-center m-auto mb-2 h-80', currentImgIndex !== index && 'hidden')"
            :src="img">
        <div class="absolute flex gap-2 -translate-x-1/2 -bottom-3 left-1/2">
            <div v-for="img, index in images"
                :class="twMerge('w-2 h-2 rounded-full bg-slate-400', currentImgIndex === index && 'bg-blue-600')"></div>
        </div>
    </div>
</template>