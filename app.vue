<script setup lang="ts">
import NuxtLogoIcon from '~/assets/svg/nuxt-logo.svg?component';
import StoreIcon from '~/assets/svg/store.svg?component';
import EditIcon from '~/assets/svg/edit.svg?component';


</script>

<template>
    <nav
        class="fixed top-0 left-0 z-30 flex items-center justify-between w-screen h-16 gap-6 p-4 text-white bg-blue-600 bg-opacity-90 backdrop-blur-md sm:justify-start align-center">
        <NuxtLink class="flex gap-2 mr-2 align-middle transition-colors sm:mr-8 hover:text-green-300" to="/">
            <NuxtLogoIcon class="w-6 h-6" />
            <h4 class="font-bold whitespace-nowrap">Nuxt Shop</h4>
        </NuxtLink>
        <ul class="flex gap-3 align-middle">
            <li>
                <NuxtLink
                    class="flex items-center transition-colors underline-offset-2 hover:text-green-300 fill-white hover:fill-green-300"
                    to="/">
                    <StoreIcon class="w-6 h-6 mr-1" />
                    <span class="hidden sm:block">Home</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink
                    class="flex items-center transition-colors underline-offset-2 hover:text-green-300 fill-white hover:fill-green-300"
                    to="/create">
                    <EditIcon class="w-6 h-6 mr-1" />
                    <span class="hidden sm:block">create</span>
                </NuxtLink>
            </li>
        </ul>
        <div class="flex items-end justify-end flex-grow">
            <ShoppingCartNavIcon />
        </div>
    </nav>
    <NuxtLoadingIndicator />
    <ShoppingCartMenu />
    <div class="mt-16">
        <NuxtPage />
    </div>
</template>