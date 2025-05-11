<script setup lang="ts">
    // Imports

    // Ref values
    const route = useRoute();

    // Logo navigation
    const navToPage = () => {
        if (route.path === '/auth') {
            navigateTo('/');
        } else {
            console.log('NOT HERE YET')
        }
    }

</script>

<template>
    <div class="fixed top-0 left-0 flex flex-row items-start w-full min-h-[5vh]">
        <img class="max-h-[15vh] cursor-pointer" src="/assets/images/logo.png" alt="Recap Logo" @click="navToPage">
    </div>
</template>

<style scoped>
</style>