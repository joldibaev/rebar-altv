<script lang="ts" setup></script>

<template>
    <section class="wrapper">
        <div class="card">
            <slot></slot>
        </div>
    </section>
</template>

<style scoped>
.wrapper {
    @apply flex h-screen w-screen items-center justify-center overflow-hidden;
}

.card {
    position: relative;

    @apply bg-dark-3 max-w-screen-md overflow-hidden rounded-lg p-12 text-white shadow-lg;

    &::before {
        content: '';

        position: absolute;
        top: -25%;
        left: 50%;
        transform: translateX(-50%);

        width: 50%;
        height: 100px;

        background-image: radial-gradient(circle, theme('colors.primary') 0, transparent 100%);
        filter: blur(50px);

        animation: glove 2s infinite alternate;
    }
}

@keyframes glove {
    from {
        opacity: 1;
    }
    to {
        opacity: 0.5;
    }
}
</style>
