<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';

import HairIcon from '../icons/HairIcon.vue';
import EyebrowIcon from '../icons/EyebrowIcon.vue';
import FacialHairIcon from '../icons/FacialHairIcon.vue';

import SectionBuilder from './SectionBuilder.vue';
import { useAppearance } from '@Plugins/auth/webview/composable/useAppearance.js';
import { useTranslate } from '@Shared/translate.js';
import { Appearance } from '@Shared/types/index.js';
import { CustomSection, useUpdater } from '@Plugins/auth/webview/composable/useUpdater.js';
import Button from '../../../../../../webview/src/components/ui/Button.vue';

const { t } = useTranslate('ru');

const { appearance } = useAppearance();
const tabIndex = ref<number>(0);
const sex = computed(() => appearance.value.sex);

let values = reactive<Partial<Appearance>>({
    hair: appearance.value.hair,
    hairColor1: appearance.value.hairColor1,
    hairColor2: appearance.value.hairColor2,
    eyebrows: appearance.value.eyebrows,
    eyebrowsColor1: appearance.value.eyebrowsColor1,
    eyebrowsOpacity: appearance.value.eyebrowsOpacity,
    facialHair: appearance.value.facialHair,
    facialHairColor1: appearance.value.facialHairColor1,
    facialHairOpacity: appearance.value.facialHairOpacity,
});

const { updateValue } = useUpdater(values);

const sections: Array<Array<CustomSection>> = [
    [
        {
            name: t('character.creator.hair'),
            property: 'hair',
            min: 0,
            max: appearance.value.sex == 1 ? 76 : 80,
            increment: 1,
        },
        {
            name: t('character.creator.hair.color'),
            property: 'hairColor1',
            isColor: true,
        },
        {
            name: t('character.creator.hair.highlight'),
            property: 'hairColor2',
            isColor: true,
        },
    ],
    [
        {
            name: t('character.creator.eyebrows'),
            property: 'eyebrows',
            min: 0,
            max: 34,
            increment: 1,
        },
        {
            name: t('character.creator.visibility'),
            property: 'eyebrowsOpacity',
            min: 0,
            max: 1,
            increment: 0.1,
        },
        {
            name: t('character.creator.eyebrows.color'),
            property: 'eyebrowsColor1',
            isColor: true,
        },
    ],
    [
        {
            name: t('character.creator.facial.hair'),
            property: 'facialHair',
            min: 0,
            max: 28,
            increment: 1,
        },
        {
            name: t('character.creator.visibility'),
            property: 'facialHairOpacity',
            min: 0,
            max: 1,
            increment: 0.1,
        },
        {
            name: t('character.creator.facial.color'),
            property: 'facialHairColor1',
            isColor: true,
        },
    ],
];
</script>

<template>
    <div class="flex flex-col gap-3">
        <span class="font-semibold uppercase">{{ t('character.creator.category') }}</span>
        <div class="flex flex-row gap-3">
            <Button style-type="outlined" @click="tabIndex = 0" :active="tabIndex == 0">
                <HairIcon class="text-2xl" />
            </Button>
            <Button style-type="outlined" @click="tabIndex = 1" :active="tabIndex == 1">
                <EyebrowIcon class="text-2xl" />
            </Button>
            <Button v-if="sex == 1" style-type="outlined" size="size-10" @click="tabIndex = 2" :active="tabIndex == 2">
                <FacialHairIcon class="text-2xl" />
            </Button>
        </div>
        <SectionBuilder
            v-for="(section, index) in sections[tabIndex]"
            v-model="values"
            :key="index"
            :section="section"
            @update-value="updateValue"
        />
    </div>
</template>
