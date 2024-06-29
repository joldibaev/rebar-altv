<script lang="ts" setup>
import '../../translate/index.js'; // Import translations
import { useTranslate } from '@Shared/translate.js';
import { AuthEvents } from '@Plugins/auth/shared/auth.events.js';
import { computed, onMounted, reactive } from 'vue';
import { useEvents } from '@Composables/useEvents.js';
import Button from '../../../../../webview/src/components/ui/Button.vue';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const { t } = useTranslate('ru');

const events = useEvents();

const data = reactive({ email: '', lastLogin: '' });

const emits = defineEmits(['loaded', 'exit']);

function handleRememberedAccount(email: string, lastLogin: string) {
    data.email = email;
    data.lastLogin = lastLogin;

    emits('loaded');
}

const dateFormatted = computed(() => {
    return moment(Date.now()).format('MMMM Do YYYY, HH:mm');
});

function logOut() {
    emits('exit');
}

function logIn() {
    events.emitServer(AuthEvents.toServer.remember.login);
}

function init() {
    events.on(AuthEvents.fromServer.rememberedAccount, handleRememberedAccount);
}

onMounted(init);
</script>

<template>
    <section>
        <div class="py-5">
            <div class="mb-5">
                <div class="text-2xl">Электронная почта</div>
                <div class="text-5xl text-secondary">{{ data.email }}</div>
            </div>

            <div class="mb-5">
                <div class="text-2xl">Последний вход</div>
                <div class="text-3xl text-muted">{{ dateFormatted }}</div>
            </div>
        </div>

        <div class="flex justify-between gap-3">
            <Button class="w-full" @click="logOut">Выйти</Button>
            <Button class="w-full" @click="logIn" style-type="secondary">Войти в игру</Button>
        </div>
    </section>
</template>
