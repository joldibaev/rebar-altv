<script lang="ts" setup>
import Button from '../../../../../webview/src/components/ui/Button.vue';
import { ref } from 'vue';
import Input from '../../../../../webview/src/components/ui/Input.vue';
import { AuthRegisterProps } from '@Plugins/auth/shared/auth.interface.js';
import { useTranslate } from '@Shared/translate.js';

const { t } = useTranslate('ru');

const formData = ref<AuthRegisterProps>({
    email: '',
    password: '',
    confirmPassword: '',
});
const submitted = ref(false);

const onSubmit = () => {
    submitted.value = true;
    // Handle form submission, e.g., send data to an API
    console.log('Form Data:', formData.value);
};
</script>

<template>
    <form class="py-12" @submit.prevent="onSubmit">
        <Input class="mb-5" v-model="formData.email" type="email" :placeholder="t('auth.span.email')"></Input>

        <Input class="mb-5" v-model="formData.password" type="password" :placeholder="t('auth.span.password')"></Input>

        <Input
            class="mb-5"
            v-model="formData.confirmPassword"
            type="password"
            :placeholder="t('auth.span.confirm')"
        ></Input>

        <Button class="w-full" type="submit" style-type="primary">{{ t('auth.span.register') }}</Button>
    </form>
</template>
