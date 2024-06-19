<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
    type: HTMLInputElement['type'];
    placeholder: string;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: ''
});

const classForCheckbox = computed(() => {
    if (props.type === 'checkbox') {
        return ['accent-primary'];
    }
});
</script>

<template>
    <label class="flex items-center">
        <input :class="classForCheckbox" :type="type" :placeholder="placeholder">
        <span v-if="type === 'checkbox'" class="w-full ms-2"><slot></slot></span>
    </label>
</template>

<style scoped lang="scss">
label {
    @apply w-full;
}

input {
    @apply bg-dark-1 border-2 border-dark-2 focus:border-primary p-3 outline-0 rounded-lg text-muted flex-auto;
}
</style>
