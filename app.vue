<script setup lang="ts">
import NuxtLogoIcon from '~/assets/svg/nuxt-logo.svg?component';
import StoreIcon from '~/assets/svg/store.svg?component';
import EditIcon from '~/assets/svg/edit.svg?component';


useHead({
    title: 'Nuxt Shop',
    meta: [
        { name: 'description', content: 'Fake shop site, created for technical task.' },
    ],
});

useSeoMeta({
    title: 'Nuxt Shop',
    ogTitle: 'Nuxt Shop',
    description: 'Fake shop site, created for technical task.',
    ogDescription: 'Fake shop site, created for technical task.',
    ogImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Nuxt_logo_%282021%29.svg/2560px-Nuxt_logo_%282021%29.svg.png',
    twitterCard: 'summary_large_image',
    ogUrl: 'https://nuxt-shop-brofrong.vercel.app/'
});

</script>

<template>
    <nav class="flex items-center justify-between gap-6 p-4 text-white bg-blue-600 sm:justify-start align-center">
        <NuxtLink class="flex gap-2 mr-8 align-middle transition-colors hover:text-green-300" to="/">
            <NuxtLogoIcon class="w-6 h-6" />
            <h4 class="font-bold whitespace-nowrap">Nuxt Shop</h4>
        </NuxtLink>
        <ul class="flex gap-3 align-middle">
            <li>
                <NuxtLink
                    class="flex items-center transition-colors underline-offset-2 hover:text-green-300 fill-white hover:fill-green-300"
                    to="/">
                    <StoreIcon class="w-6 h-6 mr-1" />
                    <div>Home</div>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink
                    class="flex items-center transition-colors underline-offset-2 hover:text-green-300 fill-white hover:fill-green-300"
                    to="/create">
                    <EditIcon class="w-6 h-6 mr-1" />
                    <div>create</div>
                </NuxtLink>
            </li>
        </ul>
    </nav>
    <NuxtLoadingIndicator />
    <NuxtPage />
</template>