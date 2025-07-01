<script setup lang="ts">
// Imports

// Ref values
const route = useRoute();
const userStore = useUserStore();
const firstInitial = ref<string | undefined>();
const countdown = ref<string>('');
let timerInterval: NodeJS.Timeout;

function updateCountdown() {
    const now = new Date();

    // Get the upcoming Thursday midnight
    const nextThursday = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 4 = Thursday

    // Calculate how many days until next Thursday
    const daysUntilThursday = (4 - currentDay + 7) % 7 || 7;

    nextThursday.setDate(now.getDate() + daysUntilThursday);
    nextThursday.setHours(0, 0, 0, 0); // Midnight

    const timeDiff = nextThursday.getTime() - now.getTime();

    if (timeDiff <= 0) {
        countdown.value = '00:00:00';
        clearInterval(timerInterval);
        return;
    }

    const hours = String(Math.floor((timeDiff / (1000 * 60 * 60)))).padStart(2, '0');
    const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, '0');

    countdown.value = `${hours}:${minutes}:${seconds}`;
}

onMounted(() => {
    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
    firstInitial.value = userStore.firstName?.substring(0, 1);
});

onBeforeUnmount(() => {
    clearInterval(timerInterval);
});

// Logo navigation
const navToPage = () => {
    if (route.path === '/auth') {
        navigateTo('/');
    } else {
        navigateTo('/home')
    }
}

// Navigating to settings page
const handleInitialClick = () => {
    navigateTo('/profile');
}

</script>

<template>
    <div v-if="route.path === '/auth'" class="fixed top-0 left-0 flex flex-row items-start min-h-[5vh]">
        <img class="max-h-[15vh] cursor-pointer" src="/assets/images/logo.png" alt="Recap Logo" @click="navToPage">
    </div>
    <div v-else
        class="fixed top-0 left-0 flex flex-row items-center justify-between w-full min-h-[8vh] bg-white px-5 border-b border-gray-200">
        <img class="max-h-[8vh] cursor-pointer" src="/assets/images/logo.png" alt="Recap Logo" @click="navToPage">
        <div class="text-center flex items-center justify-center text-lg font-semibold text-gray-900">
            <span class="hidden sm:inline">Next Newsletter In:</span>
            <span class="font-mono ml-2">{{ countdown }}</span>
        </div>
        <div class="flex flex-row items-center">
            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-[#007BFF] font-bold cursor-pointer"
                @click="handleInitialClick">
                {{ firstInitial }}
            </div>
        </div>
    </div>
</template>

<style scoped></style>