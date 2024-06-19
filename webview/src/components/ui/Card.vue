<script lang="ts" setup>
</script>

<template>
    <div class="wrapper">
        <div class="card">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    @apply flex items-center justify-center w-screen h-screen overflow-hidden;
}

.card {
    position: relative;

    @apply bg-dark-3 text-white p-12 rounded-lg shadow-lg max-w-screen-md overflow-hidden;

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