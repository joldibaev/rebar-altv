<script lang="ts" setup>
import { computed } from 'vue';

import LeftIcon from '../icons/LeftIcon.vue';
import RightIcon from '../icons/RightIcon.vue';

import { Appearance } from '@Shared/types/index.js';
import { CustomSection } from '@Plugins/auth/webview/composable/useUpdater.js';
import { MakeupColors } from '@Shared/data/makeupColors.js';
import { HairColors } from '@Shared/data/hairColors.js';
import Button from '../../../../../../webview/src/components/ui/Button.vue';
import Input from '../../../../../../webview/src/components/ui/Input.vue';

const model = defineModel<Partial<Appearance>>();
const props = defineProps<{ section: CustomSection; index?: number }>();
const emits = defineEmits<(e: 'updateValue', key: 'increment' | 'decrement', section: CustomSection) => void>();

function getColorStyle(color: string) {
    return `background-color: ${color};`;
}

function updateColor(index: number) {
    const propName = String(props.section.property);

    if (props.section.isColor && !props.section.propertyInfo) {
        model.value[propName] = index;
        return;
    }

    if (!props.section.propertyInfo || !Array.isArray(model.value[propName])) {
        return;
    }

    const overlayIndex = model.value[propName].findIndex((x) => x.id == props.section.propertyInfo.id);
    if (overlayIndex <= -1) {
        return;
    }

    model.value[propName][overlayIndex][props.section.propertyInfo.name] = index;
}

function isColorSelected(index: number) {
    const propName = String(props.section.property);
    if (!props.section.propertyInfo) {
        return model.value[propName] == index;
    }

    const overlayIndex = model.value[propName].findIndex((x) => x.id == props.section.propertyInfo.id);
    if (overlayIndex <= -1) {
        return false;
    }

    return model.value[propName][overlayIndex][props.section.propertyInfo.name] === index;
}

const propertyIndex = computed(() => {
    const propName = String(props.section.property);
    return model.value[propName].findIndex((x) => x.id == props.section.propertyInfo.id);
});

const isIndexed = computed(() => typeof props.index !== 'undefined');
</script>

<template>
    <span class="font-semibold uppercase">{{ props.section.name }}</span>
    <div class="flex flex-row gap-3">
        <div class="flex flex-wrap justify-between gap-3" v-if="props.section.isColor">
            <button
                class="size-7 border-2 border-neutral-900 hover:border-neutral-200 active:scale-95"
                v-for="(color, index) in props.section.propertyInfo ? MakeupColors : HairColors"
                :style="getColorStyle(color)"
                :class="isColorSelected(index) ? ['border-neutral-200', 'border-4', 'animate-bounce'] : []"
                @click="updateColor(index)"
            >
                &nbsp;
            </button>
        </div>
        <template v-else>
            <Button style-type="outlined" @click="emits('updateValue', 'decrement', props.section)">
                <LeftIcon class="mt-[2px] text-3xl" />
            </Button>
            <Input
                class="w-full"
                v-if="!isIndexed && !props.section.propertyInfo"
                v-model="model[String(props.section.property)]"
                :min="props.section.min"
                :max="props.section.max"
            />
            <Input
                class="w-full"
                v-else-if="isIndexed && !props.section.propertyInfo"
                v-model="model[String(props.section.property)][props.index]"
                :min="props.section.min"
                :max="props.section.max"
            />
            <Input
                class="w-full"
                v-else-if="!isIndexed && props.section.propertyInfo"
                v-model="model[String(props.section.property)][propertyIndex][props.section.propertyInfo.name]"
                :min="props.section.min"
                :max="props.section.max"
            />

            <Button style-type="outlined" @click="emits('updateValue', 'increment', props.section)">
                <RightIcon class="mt-[2px] text-3xl" />
            </Button>
        </template>
    </div>
</template>
