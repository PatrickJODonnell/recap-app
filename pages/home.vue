<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { onAuthStateChanged } from 'firebase/auth';

const webSummaries = ref<string[] | null>(null);
const webLinks = ref<string[] | null>(null);
const youtubeSummaries = ref<string[] | null>(null);
const youtubeLinks = ref<string[] | null>(null);
const webTitles = ref<string[] | null>(null);
const youtubeTitles = ref<string[] | null>(null);
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

            if ([200].includes(response.statusCode) && response.statusMessage) {
                webSummaries.value = response.statusMessage.webFinalSummaries;
                webLinks.value = response.statusMessage.webLinks;
                youtubeSummaries.value = response.statusMessage.youtubeFinalSummaries;
                youtubeLinks.value = response.statusMessage.youtubeLinks;
                webTitles.value = response.statusMessage.webFinalTitles;
                youtubeTitles.value = response.statusMessage.youtubeFinalTitles;
            } else if ([204].includes(response.statusCode)) {
                console.log('yuh')
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
    <div class="mt-[3vh] min-h-[92vh] bg-gray-50 px-4 py-6 font-sans text-center">
        <!-- Empty Home Page -->
        <div v-if="!youtubeLinks?.length && !webLinks?.length"
            class="flex flex-col items-center justify-center text-center min-h-[92vh] px-4">
            <h2 class="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                Welcome to <span class="text-[#007BFF]">Recap</span>
            </h2>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                To get started, lets gather some info <a href="/profile" class="underline">here</a>.
            </p>
        </div>

        <!-- YouTube Videos -->
        <div v-if="youtubeLinks?.length" class="mt-10 max-w-6xl mx-auto">
            <h2 class="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                Your Weekly <span class="text-[#007BFF]">Newsletter</span>
            </h2>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Kick things off with trending videos you’ll love, curated just for you.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="(link, index) in youtubeLinks" :key="index"
                    class="flex flex-col gap-3 bg-white p-6 rounded-lg shadow-md border border-gray-200 text-left">
                    <div class="w-full aspect-video">
                        <iframe class="w-full h-full rounded-lg" :src="getYouTubeEmbedUrl(link)"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                    <a :href="link" target="_blank" rel="noopener noreferrer"
                        class="text-lg font-semibold text-gray-800 underline block hover:text-[#007BFF] transition-colors duration-200">
                        {{ youtubeTitles?.[index] }}
                    </a>
                    <p class="text-base text-gray-600">{{ youtubeSummaries?.[index] }}</p>
                </div>
            </div>
        </div>

        <!-- Web Articles -->
        <div v-if="webLinks?.length" class="mt-16 max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                Dive Into Some <span class="text-[#007BFF]">Articles</span>
            </h2>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Handpicked reads to keep you informed and inspired.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="(link, index) in webLinks" :key="index"
                    class="flex flex-col gap-3 bg-white p-6 rounded-lg shadow-md border border-gray-200 text-left">
                    <a :href="link" target="_blank" rel="noopener noreferrer"
                        class="text-lg font-semibold text-gray-800 underline block hover:text-[#007BFF] transition-colors duration-200">
                        {{ webTitles?.[index] }}
                    </a>
                    <p class="text-base text-gray-600">{{ webSummaries?.[index] }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
