<script lang="ts" setup>
interface Props {
    styleType: 'primary' | 'secondary' | 'standard';
    type: HTMLButtonElement['type'];
    disabled: boolean;
    active: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    styleType: 'standard',
    type: 'button',
    disabled: false,
    active: false,
});
</script>

<template>
    <button :disabled="disabled" :class="[props.styleType, { active: props.active }]">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
button {
    @apply border border-transparent px-6 py-2 font-bold;

    transition:
        border 0.2s ease,
        background-color 0.2s ease,
        color 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.2s ease;

    &:not(:disabled):active {
        transform: scale(0.99);
    }

    &.primary {
        @apply bg-primary text-dark-2 outline-2;
        box-shadow: 0 0 25px rgba(var(--color-primary-rgb), 0.25);

        &:disabled {
            @apply bg-muted border-muted;
        }
    }

    &.secondary {
        @apply bg-secondary text-dark-2 outline-2;
        box-shadow: 0 0 25px rgba(var(--color-secondary-rgb), 0.25);

        &:disabled {
            @apply bg-muted border-muted;
        }
    }

    &.active {
        @apply bg-primary text-dark-2 outline-2;
        box-shadow: 0 0 25px rgba(var(--color-primary-rgb), 0.25);

        &:disabled {
            @apply bg-muted border-muted;
        }
    }

    &:disabled {
        @apply cursor-not-allowed;
        box-shadow: none;
    }
}
</style>
