<script lang="ts" setup>
interface Props {
    type: 'standard' | 'outlined' | 'bg' | 'shadow';
}

withDefaults(defineProps<Props>(), {
    type: 'standard'
});
</script>

<template>
    <div class="title" :class="type">
        <div v-if="type === 'outlined'" class="title-outline">
            <slot></slot>
        </div>

        <div class="label">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.title-typo {
    @apply font-display text-white;
}

.title {
    position: relative;
    @apply title-typo;

    > .label {
        position: relative;
        z-index: 1;
    }
}

.title.bg > .label {
    @apply text-primary px-3;

    background-image: linear-gradient(90deg, rgba(var(--color-primary-rgb), 0.5), rgba(var(--color-primary-rgb), 0));
}

.title.shadow {
    &::after {
        background-color: theme('colors.primary');
        background-image: radial-gradient(circle, theme('colors.primary') 0, transparent 100%);
        content: "";
        filter: blur(50px);
        height: 90px;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
        width: 90px;
    }
}

.title-outline {
    @apply title-typo;

    position: relative;
    top: -.5rem;
    height: 0;

    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #fff;
    opacity: .1;

    transform: scale(.98);

    pointer-events: none;

    &::after {
        background: linear-gradient(0deg, #0f161b, hsla(0, 0%, 100%, 0));
        bottom: -2px;
        content: "";
        height: 100%;
        left: 0;
        opacity: .65;
        position: absolute;
        width: 100%;
    }
}
</style>