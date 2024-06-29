<script lang="ts" setup>
import Button from '../../../../../webview/src/components/ui/Button.vue';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import Input from '../../../../../webview/src/components/ui/Input.vue';
import { useEvents } from '@Composables/useEvents.js';
import { AuthEvents } from '@Plugins/auth/shared/auth.events.js';
import { AuthLoginProps } from '@Plugins/auth/shared/auth.interface.js';
import { useTranslate } from '@Shared/translate.js';
import Alert from '../../../../../webview/src/components/ui/Alert.vue';

const { t } = useTranslate('ru');

const events = useEvents();

const alertRef = ref(null);

const formData = reactive<AuthLoginProps>({
    email: 'nurlan@joldibaev.uz',
    password: '',
    rememberMe: false,
});
const submitted = ref(false);

const invalidCredentials = ref(false);
const invalidEmail = computed(() => !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email));
const invalidPasswordLength = computed(() => formData.password.length < 6);

const onSubmit = (event: Event) => {
    submitted.value = true;

    if (!invalidEmail.value && !invalidPasswordLength.value) {
        events.emitServer(AuthEvents.toServer.login, formData);
    }
};

function handleInvalidCredentials() {
    submitted.value = false;
    invalidCredentials.value = true;

    nextTick(() => {
        alertRef.value?.triggerShake();
    });
}

function init() {
    events.on(AuthEvents.fromServer.invalidCredentials, handleInvalidCredentials);
}

onMounted(init);
</script>

<template>
    <form class="py-12" novalidate @submit.prevent="onSubmit">
        <Alert class="mb-5 text-danger" v-if="invalidCredentials" ref="alertRef">
            {{ t('auth.span.invalid_credentials') }}
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

        <Input class="mb-5" v-model="formData.rememberMe" type="checkbox">{{ t('auth.span.remember') }}</Input>

        <Button class="w-full" type="submit" style-type="primary">{{ t('auth.span.login') }}</Button>
    </form>
</template>
