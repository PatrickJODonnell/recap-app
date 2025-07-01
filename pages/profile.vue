<script setup lang="ts">
// Imports

// Ref Values
const userStore = useUserStore();
const firstName = ref<string | null>(null);
const lastName = ref<string | null>(null);
const email = ref<string | null>(null);
const birthDate = ref<Date | null>(null);
const plan = ref<string | null>(null);
const interests = ref<string | null>(null);

// Populating ref values from store
onMounted(() => {
    firstName.value = userStore.firstName;
    lastName.value = userStore.lastName;
    email.value = userStore.email;
    const parts = String(userStore.birthDate).split("-");
    const month = parseInt(parts[0], 10) - 1;
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    birthDate.value = new Date(year, month, day);
    plan.value = userStore.plan;
    interests.value = userStore.interests.join(', ');
})

</script>

<template>
    <Toast />
    <NavBar />
    <div class="mt-[8vh] min-h-[92vh] bg-gray-50 px-4 py-6 font-sans text-center">
        <div class="flex flex-col items-center text-center min-h-[25vh] px-4">
            <h2 class="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                Personalize <span class="text-[#007BFF]">Your Experience</span>
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl">
                Update your preferences and account details below — this helps us tailor your newsletter just for you.
            </p>
        </div>
        <div>
            <form @submit.prevent="handleSubmit"
                class="max-w-md mx-auto bg-white p-6 rounded shadow space-y-5 text-left">

                <div>
                    <label for="first-name" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <InputText v-model="firstName" id="first-name" class="w-full" placeholder="Enter your first name" />
                </div>

                <div>
                    <label for="last-name" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <InputText v-model="lastName" id="last-name" class="w-full" placeholder="Enter your last name" />
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <InputText v-model="email" id="email" class="w-full" disabled v-tooltip="'Sorry! No email changes for now.'"/>
                </div>

                <div>
                    <label for="birth-date" class="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
                    <Calendar v-model="birthDate" inputId="birth-date" class="w-full" showIcon dateFormat="yy-mm-dd" />
                </div>

                <div>
                    <label for="plan" class="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                    <InputText v-model="plan" id="plan" class="w-full" disabled v-tooltip="'Only basic plans are currently available.'"/>
                </div>

                <div>
                    <label for="interests" class="block text-sm font-medium text-gray-700 mb-1">Interests</label>
                    <Textarea rows=7 v-model="interests" id="interests" class="w-full" placeholder="Pick your interests" v-tooltip="'Enter interests seperated by a comma and a space.'"/>
                </div>

                <div class="flex justify-center">
                    <Button type="submit" label="Submit"
                        class="hover:bg-blue-600 text-white px-4 py-2 rounded" />
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>
