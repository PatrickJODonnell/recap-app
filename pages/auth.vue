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
    const initialSignUpValues = ref({
        email: '',
        password: ''
    });
    const initialForgotValues = ref({
        email: ''
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

    const signup_resolver = ref(zodResolver(
        z.object({
            email: z.string().min(5, { message: 'Email is required.' }).email({ message: 'Invalid email address.' }),
            password: z.string().min(7, { message: 'Password is required.' })
        })
    ));

    const forgot_resolver = ref(zodResolver(
        z.object({
            email: z.string().min(5, { message: 'Email is required.' }).email({ message: 'Invalid email address.' })
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

    // Sign up form submission
    const onSignUpFormSubmit = (signUpSubmissionEvent: FormSubmitEvent) => {
        const valid: boolean = signUpSubmissionEvent.valid;
        const email: string = signUpSubmissionEvent.states.email.value;
        const password: string = signUpSubmissionEvent.states.password.value;
        if (valid) {
            // TODO -> HERE IS WHERE WE WILL HOUSE THE SIGN UP LOGIC
            navigateTo('/auth?mode=login');
            toast.add({ severity: 'success', summary: 'Thank you!', detail: 'Please confirm your email to log in', life: 5000 });
            signUpSubmissionEvent.reset();
        } else {
            toast.add({severity: 'error', summary: 'Unsuccessful Sign Up', detail: 'Please try again', life: 3000})
        }
    }

    // Forgot password form submission
    const onForgotFormSubmit = (forgotSubmissionEvent: FormSubmitEvent) => {
        const valid: boolean = forgotSubmissionEvent.valid;
        const email: string = forgotSubmissionEvent.states.email.value;
        if (valid) {
            // TODO -> HERE IS WHERE WE WILL HOUSE THE FORGOT PASSWORD LOGIC
            navigateTo('/auth?mode=login');
            toast.add({ severity: 'success', summary: 'Thank you!', detail: 'Check your inbox for a reset email', life: 5000 });
            forgotSubmissionEvent.reset();
        } else {
            toast.add({severity: 'error', summary: 'Unsuccessful Reset', detail: 'Please try again', life: 3000})
        }
    }
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
            <template #subtitle>Please enter your information</template>
            <template #content>
                <div class="m-5">
                    <Form v-slot="$form" :resolver="signup_resolver" :initialValues="initialSignUpValues" @submit="(e) => onSignUpFormSubmit(e)" class="flex justify-center flex-col gap-4">
                        <div class="flex flex-col gap-1">
                            <InputText name="email" type="text" placeholder="Email" />
                            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
                        </div>
                        <div class="flex flex-col gap-1">
                            <InputText name="password" type="password" placeholder="Password" />
                            <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
                        </div>
                        <Button type="submit" severity="secondary" label="Sign Up" />
                    </Form>
                    <div class="m-5 flex justify-center flex-col gap-4 text-center">
                        <p>
                            Have an account? <RouterLink class="text-blue-600 hover:underline cursor-pointer" to="/auth?mode=login">Log In!</RouterLink>
                        </p>
                    </div>
                </div>
            </template>
        </Card>
        <Card v-else-if="mode === 'forgot'" class="mx-auto h-[40vh] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <template #title>Forgot your password?</template>
            <template #subtitle>Lets get that fixed!</template>
            <template #content>
                <div class="m-5">
                    <Form v-slot="$form" :resolver="forgot_resolver" :initialValues="initialForgotValues" @submit="(e) => onForgotFormSubmit(e)" class="flex justify-center flex-col gap-4">
                        <div class="flex flex-col gap-1">
                            <InputText name="email" type="text" placeholder="Email" />
                            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
                        </div>
                        <Button type="submit" severity="secondary" label="Send Reset Email" />
                    </Form>
                    <div class="m-5 flex justify-center flex-col gap-4 text-center">
                        <p>
                            Changed your mind? <RouterLink class="text-blue-600 hover:underline cursor-pointer" to="/auth?mode=login">Return To Log In!</RouterLink>
                        </p>
                    </div>
                </div>
            </template>
        </Card>
        <Card v-else class="flex flex-col justify-center items-center mx-auto h-[50vh] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <template #content>
                <div class="flex flex-col justify-center items-center">
                    <h1 class="text-red-600 font-bold">
                        INVALID URL!
                    </h1>
                    <Button asChild v-slot="slotProps" variant="link">
                        <RouterLink class="text-blue-600 hover:underline cursor-pointer" to="/auth?mode=login">
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