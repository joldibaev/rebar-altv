<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { Appearance } from '@Shared/types/index.js';
import { CustomSection, useUpdater } from '@Plugins/auth/webview/composable/useUpdater.js';
import { useAppearance } from '@Plugins/auth/webview/composable/useAppearance.js';
import { useTranslate } from '@Shared/translate.js';

import SectionBuilder from './SectionBuilder.vue';
import Button from '../../../../../../webview/src/components/ui/Button.vue';

const { appearance } = useAppearance();
const { t } = useTranslate('ru');

const sectionIndex = ref(0);

let values = reactive<Partial<Appearance>>({
    headOverlays: appearance.value.headOverlays,
});

const { updateValueByProperty } = useUpdater(values);

const sections: Array<Array<CustomSection>> = [
    [
        {
            name: t('character.creator.blemishes'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 0, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 0, name: 'opacity' },
        },
    ],
    [
        {
            name: t('character.creator.aging'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 3, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 3, name: 'opacity' },
        },
    ],
    [
        {
            name: t('character.creator.damage'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 6, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 6, name: 'opacity' },
        },
    ],
    [
        {
            name: t('character.creator.sun.damage'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 7, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 7, name: 'opacity' },
        },
    ],
    [
        {
            name: t('character.creator.freckles'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 9, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 9, name: 'opacity' },
        },
    ],
    [
        {
            name: t('character.creator.lipstick'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 8, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 8, name: 'opacity' },
        },
        {
            name: t('character.creator.color'),
            property: 'headOverlays',
            isColor: true,
            propertyInfo: { id: 8, name: 'color1' },
        },
    ],
    [
        {
            name: t('character.creator.makeup'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 4, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 4, name: 'opacity' },
        },
        {
            name: t('character.creator.color'),
            property: 'headOverlays',
            isColor: true,
            propertyInfo: { id: 4, name: 'color1' },
        },
    ],
    [
        {
            name: t('character.creator.blusher'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 5, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 5, name: 'opacity' },
        },
        {
            name: t('character.creator.color'),
            property: 'headOverlays',
            isColor: true,
            propertyInfo: { id: 5, name: 'color1' },
        },
    ],
];

const SectionNames = [
    t('character.creator.blemish'),
    t('character.creator.aging'),
    t('character.creator.damage'),
    t('character.creator.sun.damage'),
    t('character.creator.freckles'),
    t('character.creator.lipstick'),
    t('character.creator.makeup'),
    t('character.creator.blusher'),
];

function handleUpdate(type: 'increment' | 'decrement', section: CustomSection) {
    if (section.propertyInfo.name.includes('color')) {
        return;
    }

    updateValueByProperty(type, section);
}
</script>

<template>
    <div class="flex flex-col gap-3">
        <div class="columns-2">
            <Button
                class="w-full"
                v-for="(sectionName, index) in SectionNames"
                @click="sectionIndex = index"
                :active="sectionIndex == index"
            >
                {{ sectionName }}
            </Button>
        </div>
        <SectionBuilder
            v-for="(section, index) in sections[sectionIndex]"
            v-model="values"
            :key="index"
            :section="section"
            @update-value="handleUpdate"
        />
    </div>
</template>
