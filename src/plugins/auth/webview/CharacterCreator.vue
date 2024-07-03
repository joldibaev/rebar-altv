<script lang="ts" setup>
import { ref } from 'vue';

import FaceIcon from './components/icons/FaceIcon.vue';
import HairIcon from './components/icons/HairIcon.vue';
import NoseIcon from './components/icons/NoseIcon.vue';
import FinishIcon from './components/icons/FinishIcon.vue';
import CosmeticIcon from './components/icons/CosmeticIcon.vue';

import FaceSection from './components/sections/FaceSection.vue';
import HairSection from './components/sections/HairSection.vue';
import FinishSection from './components/sections/FinishSection.vue';
import CosmeticSection from './components/sections/CosmeticSection.vue';
import StructureSection from './components/sections/StructureSection.vue';

import '../translate/index';
import Button from '../../../../webview/src/components/ui/Button.vue';

const tabIndex = ref<number>(0);
const tabButtons = [FaceIcon, HairIcon, NoseIcon, CosmeticIcon, FinishIcon];
const tabs = [FaceSection, HairSection, StructureSection, CosmeticSection, FinishSection];
const isProcessing = ref(false);

function handleProcessing() {
    isProcessing.value = true;
}
</script>

<template>
    <section class="start-fade-bg">
        <div class="flex flex-col gap-10 w-[450px] h-screen ms-12 py-12">
            <!-- Tabs Section -->
            <div class="flex flex-row w-full" v-if="!isProcessing">
                <Button
                    class="w-full"
                    v-for="(tab, index) in tabButtons"
                    @click="tabIndex = index"
                    :active="tabIndex == index"
                    :key="index"
                >
                    <component class="mt-1 text-3xl" :is="tab" />
                </Button>
            </div>

            <!-- Tab Section -->
            <component class="grid-rows-1" :is="tabs[tabIndex]" @on-processing="handleProcessing" />
        </div>
    </section>
</template>
