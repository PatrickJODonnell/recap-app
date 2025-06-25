<script setup lang="ts">
    // Imports

    // Ref values
    const route = useRoute();

    // Logo navigation
    const navToPage = () => {
        if (route.path === '/auth') {
            navigateTo('/');
        } else {
            navigateTo('/home')
        }
    }

</script>

<template>
    <div v-if="route.path === '/auth'" class="fixed top-0 left-0 flex flex-row items-start w-full min-h-[5vh]">
        <img class="max-h-[15vh] cursor-pointer" src="/assets/images/logo.png" alt="Recap Logo" @click="navToPage">
    </div>
    <div v-else class="fixed top-0 left-0 flex flex-row items-center justify-between w-full min-h-[8vh] bg-red px-5">
        <img class="max-h-[8vh] cursor-pointer" src="/assets/images/logo.png" alt="Recap Logo" @click="navToPage">
        <div class="flex flex-row items-center">
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
        </div>
    </div>
</template>

<style scoped>
</style>