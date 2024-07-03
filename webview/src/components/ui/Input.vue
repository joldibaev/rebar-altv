<script lang="ts" setup>
import { ref } from 'vue';

const model = defineModel();

const inputRef = ref<HTMLInputElement | null>(null);

interface Invalid {
    value: boolean;
    message?: string;
}

interface Props {
    type: HTMLInputElement['type'];
    invalid: Invalid;
    placeholder: string;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    invalid: { value: false, message: '' },
    placeholder: '',
});

const focus = () => {
    inputRef.value?.focus();
};

defineExpose({
    focus,
});
</script>

<template>
    <div>
        <label class="flex items-center">
            <input
                v-model="model"
                ref="inputRef"
                :class="{ 'accent-primary': type === 'checkbox', invalid: invalid.value }"
                :type="type"
                :placeholder="placeholder"
            />
            <span class="ms-2 w-full" v-if="type === 'checkbox'"><slot></slot></span>
        </label>

        <div class="text-danger mt-2" v-if="invalid.value && invalid.message">{{ invalid.message }}</div>
    </div>
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

    &.invalid {
        @apply border-danger;
        box-shadow: 0 0 25px rgba(var(--color-danger-rgb), 0.15);
    }
}
</style>
