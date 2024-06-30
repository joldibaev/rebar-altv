<script lang="ts" setup>
import '../translate/index'; // Import translations
import Title from '../../../../webview/src/components/ui/Title.vue';
import Button from '../../../../webview/src/components/ui/Button.vue';
import { ref } from 'vue';
import AuthLogin from '@Plugins/auth/webview/components/AuthLogin.vue';
import AuthRegister from '@Plugins/auth/webview/components/AuthRegister.vue';
import { useTranslate } from '@Shared/translate.js';
import RememberAuth from '@Plugins/auth/webview/components/RememberAuth.vue';

const { t } = useTranslate('ru');

const state = ref<'login' | 'remember-me' | 'register'>('login');
</script>

<template>
    <section class="wrapper">
        <div class="auth">
            <Title class="mb-5 text-center text-8xl" type="outlined">Verona</Title>

            <RememberAuth
                v-show="state === 'remember-me'"
                @loaded="state = 'remember-me'"
                @exit="state = 'login'"
            ></RememberAuth>

            <template v-if="state !== 'remember-me'">
                <div class="flex justify-center gap-3">
                    <Button :active="state === 'login'" @click="state = 'login'">{{ t('auth.span.login') }}</Button>
                    <Button :active="state === 'register'" @click="state = 'register'"
                        >{{ t('auth.span.register') }}
                    </Button>
                </div>

                <AuthLogin v-if="state === 'login'"></AuthLogin>
                <AuthRegister v-else></AuthRegister>
            </template>
        </div>
    </section>
</template>

<style scoped>
.wrapper {
    background-image: linear-gradient(
        90deg,
        rgba(var(--color-dark-3-rgb), 1),
        rgba(var(--color-dark-3-rgb), 0.4),
        rgba(var(--color-dark-3-rgb), 0.1)
    );

    @apply z-0 flex h-screen w-screen items-center ps-96 text-white;
}

.auth {
    @apply relative z-10 w-96;
}
</style>
