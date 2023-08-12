<script setup lang="ts">
import CloseIcon from '~/assets/svg/close.svg?component';

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ (e: 'close', data: void): void }>();
</script>


<template>
    <Teleport to="body">
        <div v-if="props.isOpen"
            class="fixed top-0 left-0 z-40 w-screen h-screen p-4 bg-white bg-opacity-80 backdrop-blur-lg">
            <div class="flex flex-row items-center justify-between">
                <h2 class="text-xl font-bold">Filters</h2>
                <CloseIcon @click="emit('close')" />
            </div>
            <slot></slot>
        </div>

    </Teleport>
</template>