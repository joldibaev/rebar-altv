<script lang="ts" setup>
import '../translate/index'; // Import translations
import Title from '../../../../webview/src/components/ui/Title.vue';
import Button from '../../../../webview/src/components/ui/Button.vue';
import { ref } from 'vue';
import AuthLogin from '@Plugins/auth/webview/components/auth/AuthLogin.vue';
import AuthRegister from '@Plugins/auth/webview/components/auth/AuthRegister.vue';
import { useTranslate } from '@Shared/translate.js';
import RememberAuth from '@Plugins/auth/webview/components/auth/RememberAuth.vue';

const { t } = useTranslate('ru');

const state = ref<'login' | 'remember-me' | 'register'>('login');
</script>

<template>
    <section class="start-fade-bg px-72 flex items-center">
        <div class="w-96">
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
