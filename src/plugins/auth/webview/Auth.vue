<script lang="ts" setup>
import Title from '../../../../webview/src/components/ui/Title.vue';
import Button from '../../../../webview/src/components/ui/Button.vue';
import { ref } from 'vue';
import Input from '../../../../webview/src/components/ui/Input.vue';

const state = ref<'login' | 'register'>('login');
</script>

<template>
    <div class="wrapper">
        <div class="auth">
            <Title class="mb-5 text-center text-8xl" type="outlined">Verona</Title>

            <div class="flex justify-center gap-3">
                <Button :active="state === 'login'" @click="state = 'login'">Авторизация</Button>
                <Button :active="state === 'register'" @click="state = 'register'">Регистрация</Button>
            </div>

            <form class="py-12">
                <Input class="mb-5" type="text" placeholder="Электронная почта"></Input>

                <Input class="mb-5" type="password" placeholder="Пароль"></Input>

                <Input class="mb-5" type="checkbox">Запомнить меня</Input>

                <Button type="submit" style-type="primary" class="w-full">Авторизоваться</Button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    background-image: linear-gradient(
        90deg,
        rgba(var(--color-dark-3-rgb), 1),
        rgba(var(--color-dark-3-rgb), 0.9),
        rgba(var(--color-dark-3-rgb), 0.6),
        rgba(var(--color-dark-3-rgb), 0.1)
    );

    @apply z-0 flex h-screen w-screen items-center ps-96 text-white;
}

.auth {
    @apply relative z-10 w-96;
}
</style>
