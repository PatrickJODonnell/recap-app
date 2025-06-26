<script setup lang="ts">
    // Imports

    // Ref Values
    const webSummaries = ref<string[] | null>(null);
    const webLinks = ref<string[] | null>(null);
    const youtubeSummaries = ref<string[] | null>(null);
    const youtubeLinks = ref<string[] | null>(null);
    const userStore = useUserStore();


    // Pulling article values
    watchEffect(() => {
        if (userStore) {
            // Pulling content information
            const contentResponse = await authedFetch('/api/content/get', {
                method: 'GET',
                params: {
                    'uid': userStore.uid
                }
            });
            if (contentResponse.statusCode === 200 || contentResponse.statusCode === 204) {

            } else {
                
            }
        }
    })

</script>

<template>
    <NavBar/>
    <div class="home-background">
        <div>
            HERE I AM
        </div>
    </div>
</template>

<style scoped>
    .home-background{
        margin-top: 8vh;
        height: 92vh;
        background-color: #f9f9f9;
    }
</style>