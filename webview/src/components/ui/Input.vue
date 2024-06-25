<script lang="ts" setup>
import { computed, defineProps } from 'vue';

interface Props {
    type: HTMLInputElement['type'];
    placeholder: string;
    modelValue: string;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: '',
    modelValue: '',
});

const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void;
}>();

const onInput = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const classForCheckbox = computed(() => {
    if (props.type === 'checkbox') {
        return ['accent-primary'];
    }
});
</script>

<template>
    <label class="flex items-center">
        <input :value="modelValue" @input="onInput" :class="classForCheckbox" :type="type" :placeholder="placeholder" />
        <span class="ms-2 w-full" v-if="type === 'checkbox'"><slot></slot></span>
    </label>
</template>

<style scoped lang="scss">
label {
    @apply w-full;
}

input {
    @apply bg-dark-1 border-dark-2 focus:border-primary text-muted flex-auto border-2 p-3 outline-0;

    transition:
        border 0.2s ease,
        background-color 0.2s ease,
        color 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.2s ease;

    &:active {
        transform: scale(0.995);
    }

    &:focus {
        box-shadow: 0 0 25px rgba(var(--color-primary-rgb), 0.15);
    }
}
</style>
