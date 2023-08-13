<script setup lang="ts">
import NuxtLogoIcon from '~/assets/svg/nuxt-logo.svg?component';
import StoreIcon from '~/assets/svg/store.svg?component';
import EditIcon from '~/assets/svg/edit.svg?component';

const route = useRoute()
</script>

<template>
    <nav class="flex items-center justify-between gap-6 p-4 text-white bg-blue-600 sm:justify-start align-center">
        <NuxtLink class="flex gap-2 mr-8 align-middle transition-colors hover:text-green-300" to="/">
            <NuxtLogoIcon class="w-6 h-6" />
            <h4 class="font-bold whitespace-nowrap">Nuxt Shop</h4>
        </NuxtLink>
        <ul class="flex gap-3 align-middle">
            <a class="flex items-center transition-colors underline-offset-2 hover:text-green-300 fill-white hover:fill-green-300"
                href="/">
                <StoreIcon class="w-6 h-6 mr-1" />
                <li>Home</li>
            </a>
            <NuxtLink
                class="flex items-center transition-colors underline-offset-2 hover:text-green-300 fill-white hover:fill-green-300"
                to="/create">
                <EditIcon class="w-6 h-6 mr-1" />
                <li>Create</li>
            </NuxtLink>
        </ul>
    </nav>
    <NuxtLoadingIndicator />
    <NuxtPage />
</template>