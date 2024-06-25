<script lang="ts" setup>
import Button from '../../../../../webview/src/components/ui/Button.vue';
import { onMounted, ref } from 'vue';
import Input from '../../../../../webview/src/components/ui/Input.vue';
import { useEvents } from '@Composables/useEvents.js';
import { AuthEvents } from '@Plugins/auth/shared/auth.events.js';
import { AuthLoginProps } from '@Plugins/auth/shared/auth.interface.js';
import { useTranslate } from '@Shared/translate.js';

const { t } = useTranslate('ru');

const events = useEvents();

const isInvalid = ref(false);

const formData = ref<AuthLoginProps>({
    email: '',
    password: '',
    rememberMe: false,
});
const submitted = ref(false);

const onSubmit = () => {
    submitted.value = true;
    // Handle form submission, e.g., send data to an API
    console.log('Form Data:', formData.value);

    events.emitServer(AuthEvents.toServer.login, formData);
};

function handleInvalid() {
    isInvalid.value = true;
}

function init() {
    events.on(AuthEvents.fromServer.invalidLogin, handleInvalid);
}

onMounted(init);
</script>

<template>
    <form class="py-12" @submit.prevent="onSubmit">
        <Input class="mb-5" v-model="formData.email" type="email" :placeholder="t('auth.span.email')"></Input>

        <Input class="mb-5" v-model="formData.password" type="password" :placeholder="t('auth.span.password')"></Input>

        <Input class="mb-5" v-model="formData.rememberMe" type="checkbox">{{ t('auth.span.remember') }}</Input>

        <Button class="w-full" type="submit" style-type="primary">{{ t('auth.span.login') }}</Button>
    </form>
</template>
