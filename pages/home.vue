<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { onAuthStateChanged } from 'firebase/auth';

const webSummaries = ref<string[] | null>(null);
const webLinks = ref<string[] | null>(null);
const youtubeSummaries = ref<string[] | null>(null);
const youtubeLinks = ref<string[] | null>(null);
const userStore = useUserStore();
const { $auth } = useNuxtApp();
const toast = useToast();

onMounted(async () => {
    onAuthStateChanged($auth, async (user) => {
        if (!user) return;
        try {
            const response = await authedFetch('/api/content/get', {
                method: 'GET',
                params: { uid: userStore.uid }
            });

            if ([200, 204].includes(response.statusCode) && response.statusMessage) {
                webSummaries.value = response.statusMessage.webFinalSummaries;
                webLinks.value = response.statusMessage.webLinks;
                youtubeSummaries.value = response.statusMessage.youtubeFinalSummaries;
                youtubeLinks.value = response.statusMessage.youtubeLinks;
            } else {
                toast.add({
                    severity: 'error',
                    summary: 'Failed to Pull Content',
                    detail: 'Please contact support',
                    life: 3000
                });
            }
        } catch (err) {
            console.error('authedFetch failed', err);
            toast.add({
                severity: 'error',
                summary: 'Error fetching content',
                detail: 'Please contact support',
                life: 3000
            });
        }
    });
});

function getYouTubeEmbedUrl(url: string): string {
    const match = url.match(/(?:v=|\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
}
</script>

<template>
  <Toast />
  <NavBar />
  <div class="mt-[8vh] min-h-[92vh] bg-gray-50 px-4 py-6">
    <!-- Web Articles -->
    <div v-if="webLinks?.length" class="space-y-10 mt-10 max-w-4xl mx-auto">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Your Articles</h2>
      <div v-for="(link, index) in webLinks" :key="index" class="flex flex-col items-center gap-3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <a :href="link" target="_blank" class="text-blue-600 font-medium underline text-left w-full">
          {{ link }}
        </a>
        <p class="text-gray-700 text-left w-full">{{ webSummaries?.[index] }}</p>
      </div>
    </div>

    <!-- YouTube Videos -->
    <div v-if="youtubeLinks?.length" class="space-y-10 mt-10 max-w-4xl mx-auto">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Your Videos</h2>
      <div v-for="(link, index) in youtubeLinks" :key="index" class="flex flex-col items-center gap-3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div class="w-full aspect-video">
        <iframe
            class="w-full h-full rounded-lg"
            :src="getYouTubeEmbedUrl(link)"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
        </div>
        <p class="text-gray-700 text-left w-full">{{ youtubeSummaries?.[index] }}</p>
      </div>
    </div>
  </div>
</template>
