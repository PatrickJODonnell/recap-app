import type { User } from "~/types/User";

export const useUserStore = defineStore("UserStore", () => {
    const birthDate = ref<string | null>(null);
    const email = ref<string | null>(null);
    const firstName = ref<string | null>(null);
    const lastName = ref<string | null>(null);
    const plan = ref<string | null>(null);
    const signUpDate = ref<string | null>(null);
    const interests = ref<string[]>([]);
    const uid = ref<string | null>(null);

    const clearStore = () => {
        birthDate.value = null;
        email.value = null;
        firstName.value = null;
        lastName.value = null;
        plan.value = null;
        signUpDate.value = null;
        interests.value = [];
        uid.value = null;
    }

    const populateStore = (data: User) => {
        birthDate.value = data.birthDate;
        email.value = data.email;
        firstName.value = data.firstName;
        lastName.value = data.lastName;
        plan.value = data.plan;
        signUpDate.value = data.signUpDate;
        interests.value = data.interests;
        uid.value = data.uid;
    }

    return {
        birthDate,
        email,
        firstName,
        lastName,
        plan,
        signUpDate,
        interests,
        uid,
        clearStore,
        populateStore
    };
}, {
    persist: true,
});