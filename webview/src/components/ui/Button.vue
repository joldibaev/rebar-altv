<script lang="ts" setup>

interface Props {
    styleType: 'primary' | 'secondary' | 'standard';
    type: HTMLButtonElement['type'];
    active: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    styleType: 'standard',
    type: 'button',
    active: false
});

</script>

<template>
    <button :class="[props.styleType, { active: props.active }]">
        <slot></slot>
    </button>
</template>

<style scoped lang="scss">
button {
    @apply rounded-lg px-6 py-2 font-bold;

    &.active {
        @apply bg-primary outline-2 text-dark-2;
    }

    &.primary {
        @apply bg-primary border text-dark-2;
    }
}
</style>
