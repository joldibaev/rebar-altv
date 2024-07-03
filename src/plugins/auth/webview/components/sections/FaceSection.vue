<script lang="ts" setup>
import { computed, reactive } from 'vue';

import { Appearance } from '@Shared/types/index.js';

import FeminineIcon from '../icons/FeminineIcon.vue';
import MasculineIcon from '../icons/MasculineIcon.vue';
import SectionBuilder from './SectionBuilder.vue';

import { useTranslate } from '@Shared/translate.js';
import { useAppearance } from '@Plugins/auth/webview/composable/useAppearance.js';
import { useUpdater } from '@Plugins/auth/webview/composable/useUpdater.js';
import Button from '../../../../../../webview/src/components/ui/Button.vue';

type CustomSection = { name: string; property: keyof Appearance; min: number; max: number; increment: number };

const { t } = useTranslate('ru');
const { appearance, setField } = useAppearance();
const sex = computed(() => appearance.value.sex);

let values = reactive<Partial<Appearance>>({
    faceFather: appearance.value.faceFather,
    faceMother: appearance.value.faceMother,
    skinFather: appearance.value.skinFather,
    skinMother: appearance.value.skinMother,
    faceMix: appearance.value.faceMix,
    skinMix: appearance.value.skinMix,
    eyes: appearance.value.eyes,
});

const { updateValue } = useUpdater(values);

const sections: Array<CustomSection> = [
    { name: t('character.creator.face.father'), property: 'faceFather', min: 0, max: 45, increment: 1 },
    { name: t('character.creator.face.mother'), property: 'faceMother', min: 0, max: 45, increment: 1 },
    { name: t('character.creator.skin.father'), property: 'skinFather', min: 0, max: 45, increment: 1 },
    { name: t('character.creator.skin.mother'), property: 'skinMother', min: 0, max: 45, increment: 1 },
    { name: t('character.creator.face.mix'), property: 'faceMix', min: 0, max: 1, increment: 0.1 },
    { name: t('character.creator.skin.mix'), property: 'skinMix', min: 0, max: 1, increment: 0.1 },
    { name: t('character.creator.eyes'), property: 'eyes', min: 0, max: 31, increment: 1 },
];
</script>

<template>
    <div class="flex flex-col gap-3">
        <span class="font-cap font-semibold uppercase">{{ t('character.creator.body.type') }}</span>
        <div class="flex gap-3">
            <!-- Model Selection -->
            <Button style-type="outlined" @click="setField('sex', 0)" :active="sex == 0">
                <FeminineIcon class="mt-[2px] text-3xl mx-auto" />
            </Button>

            <Button style-type="outlined" @click="setField('sex', 1)" :active="sex == 1">
                <MasculineIcon class="mt-[2px] text-3xl mx-auto" />
            </Button>
        </div>

        <!-- Face Appearance -->
        <SectionBuilder
            v-for="(section, index) in sections"
            v-model="values"
            :key="index"
            :section="section"
            @update-value="updateValue"
        />
    </div>
</template>
