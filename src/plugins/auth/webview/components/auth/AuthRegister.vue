<script lang="ts" setup>
import Button from '../../../../../../webview/src/components/ui/Button.vue';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import Input from '../../../../../../webview/src/components/ui/Input.vue';
import { AuthRegisterProps } from '@Plugins/auth/shared/auth.interface.js';
import { useTranslate } from '@Shared/translate.js';
import { AuthEvents } from '@Plugins/auth/shared/auth.events.js';
import { useEvents } from '@Composables/useEvents.js';
import Alert from '../../../../../../webview/src/components/ui/Alert.vue';

const { t } = useTranslate('ru');

const events = useEvents();

const alertRef = ref(null);

const userAlreadyExists = ref(false);

const formData = reactive<AuthRegisterProps>({
    email: '',
    password: '',
    confirmPassword: '',
});
const submitted = ref(false);

const invalidEmail = computed(() => !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email));
const invalidPasswordLength = computed(() => formData.password.length < 6);
const invalidConfirmPassword = computed(() => formData.password !== formData.confirmPassword);

const onSubmit = () => {
    submitted.value = true;

    if (!invalidEmail.value && !invalidPasswordLength.value && !invalidConfirmPassword.value) {
        events.emitServer(AuthEvents.toServer.register, formData);
    }
};

function handleUserAlreadyExists() {
    userAlreadyExists.value = true;

    nextTick(() => {
        alertRef.value?.triggerShake();
    });
}

function init() {
    events.on(AuthEvents.fromServer.userAlreadyExists, handleUserAlreadyExists);
}

onMounted(init);
</script>

<template>
    <form class="py-12" novalidate @submit.prevent="onSubmit">
        <Alert class="mb-5 text-danger" v-if="userAlreadyExists" ref="alertRef">
            {{ t('auth.span.user_already_exists') }}
        </Alert>

        <Input
            class="mb-5"
            v-model="formData.email"
            :invalid="{ value: submitted && invalidEmail, message: t('auth.span.invalid_email') }"
            type="email"
            :placeholder="t('auth.span.email')"
        ></Input>

        <Input
            class="mb-5"
            v-model="formData.password"
            :invalid="{ value: submitted && invalidPasswordLength, message: t('auth.span.invalid_password_length') }"
            type="password"
            :placeholder="t('auth.span.password')"
        ></Input>

        <Input
            class="mb-5"
            v-model="formData.confirmPassword"
            :invalid="{ value: submitted && invalidConfirmPassword, message: t('auth.span.invalid_confirm_password') }"
            type="password"
            :placeholder="t('auth.span.confirm')"
        ></Input>

        <Button class="w-full" type="submit" style-type="primary">{{ t('auth.span.register') }}</Button>
    </form>
</template>
