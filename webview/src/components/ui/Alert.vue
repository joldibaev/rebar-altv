<script lang="ts" setup>
import AlertIcon from './icons/AlertIcon.vue';
import { ref } from 'vue';

const alertRef = ref<HTMLDivElement | null>(null);

const triggerShake = () => {
    if (alertRef.value) {
        alertRef.value.classList.remove('shake');
        void alertRef.value.offsetWidth; // Reflow
        alertRef.value.classList.add('shake');
    }
};

defineExpose({
    triggerShake,
});
</script>

<template>
    <div class="shake bg-danger bg-opacity-5 border border-danger px-5 py-3 text-danger" ref="alertRef">
        <div class="flex items-center gap-4">
            <AlertIcon></AlertIcon>

            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.shake {
    animation: shake 0.5s ease-in-out;
}
</style>
