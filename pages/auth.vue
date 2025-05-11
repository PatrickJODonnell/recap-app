<script setup lang="ts">
    // Imports 
    import { zodResolver } from '@primevue/forms/resolvers/zod';
    import { z } from 'zod';
    import { useToast } from "primevue/usetoast";
    import type { FormSubmitEvent } from '@primevue/forms';

    // Initializing toast
    const toast = useToast();

    // Ref values
    const route = useRoute();
    const mode = ref<string>('login');
    const initialValues = ref({
        email: '',
        password: ''
    });

    // Getting initial route information
    onMounted(() => {
        mode.value = String(route.query.mode);
    });

    // Watching for route change
    watch(() => route.query.mode, (newVal) => {
        mode.value = String(newVal);
    });

    // Form validation
    const login_resolver = ref(zodResolver(
        z.object({
            email: z.string().min(3, { message: 'Email is required.' }).email({ message: 'Invalid email address.' }),
            password: z.string().min(7, { message: 'Password is required.' })
        })
    ));

    // Login form submission
    const onLoginFormSubmit = (loginSubmissionEvent: FormSubmitEvent) => {
        const valid: boolean = loginSubmissionEvent.valid;
        const email: string = loginSubmissionEvent.states.email.value;
        const password: string = loginSubmissionEvent.states.password.value;
        if (valid) {
            // TODO -> HERE IS WHERE WE WILL HOUSE THE LOGIN LOGIC
            toast.add({ severity: 'success', summary: 'Welcome in!', detail: 'Successful Log In', life: 3000 });
            loginSubmissionEvent.reset();
        } else {
            toast.add({ severity: 'error', summary: 'Unsuccessful Log In', detail: 'Please try again', life: 3000 });
        }
    };

</script>

<template>
    <Toast />
    <div class="flex flex-col justify-center items-center w-screen h-screen bg-[#b0b8b6] bg-cover bg-center">
        <NavBar />
        <Card v-if="mode === 'login'" class="mx-auto min-h-[50vh] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <template #title>Welcome Back!</template>
            <template #subtitle>Please enter your information</template>
            <template #content>
                <div class="m-5">
                    <Form v-slot="$form" :resolver="login_resolver" :initialValues="initialValues" @submit="(e) => onLoginFormSubmit(e)" class="flex justify-center flex-col gap-4">
                        <div class="flex flex-col gap-1">
                            <InputText name="email" type="text" placeholder="Email" />
                            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
                        </div>
                        <div class="flex flex-col gap-1">
                            <InputText name="password" type="password" placeholder="Password" />
                            <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
                        </div>
                        <Button type="submit" severity="secondary" label="Log In" />
                    </Form>
                    <div class="m-5 flex justify-center flex-col gap-4 text-center">
                        <p>
                            Don't have an account? <RouterLink class="text-blue-600 hover:underline cursor-pointer" to="/auth?mode=signup">Sign Up!</RouterLink>
                        </p>
                        <p>
                            <RouterLink class="text-blue-600 hover:underline cursor-pointer" to="/auth?mode=forgot">Forgot Password?</RouterLink>
                        </p>
                    </div>
                </div>
            </template>
        </Card>
        <Card v-else-if="mode === 'signup'" class="mx-auto h-[50vh] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <template #title>Welcome!</template>
            <template #content>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </template>
        </Card>
        <Card v-else-if="mode === 'forgot'" class="mx-auto h-[50vh] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <template #title>Forgot you password?</template>
            <template #subtitle>Lets get that fixed!</template>
            <template #content>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </template>
        </Card>
        <Card v-else class="flex flex-col justify-center items-center mx-auto h-[50vh] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <template #content>
                <div class="flex flex-col justify-center items-center">
                    <h1 class="text-red-600 font-bold">
                        INVALID URL!
                    </h1>
                    <Button asChild v-slot="slotProps" variant="link">
                        <RouterLink to="/auth?mode=login">
                            Click here to return to login
                        </RouterLink>
                    </Button>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
</style>