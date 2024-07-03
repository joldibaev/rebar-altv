<script lang="ts" setup>
import { computed, reactive, ref, toRaw } from 'vue';
import { useAppearance } from '@Plugins/auth/webview/composable/useAppearance.js';
import { useTranslate } from '@Shared/translate.js';
import { CharacterCreatorEvents } from '@Plugins/auth/shared/auth.events.js';
import { useEvents } from '@Composables/useEvents.js';
import Button from '../../../../../../webview/src/components/ui/Button.vue';
import Input from '../../../../../../webview/src/components/ui/Input.vue';

const { t } = useTranslate('ru');

const emits = defineEmits<{ (e: 'onProcessing'): void }>();
const { appearance } = useAppearance();
const events = useEvents();
const processing = ref(false);

const formData = reactive({
    firstName: '',
    lastName: '',
});
const submitted = ref(false);

const invalidFirstName = computed(() => formData.firstName.length < 2);
const invalidLastName = computed(() => formData.lastName.length < 2);

function onSubmit() {
    submitted.value = true;

    if (invalidFirstName || invalidLastName || processing.value) {
        return;
    }

    events.emitServer(CharacterCreatorEvents.toServer.create, { player: formData, data: toRaw(appearance.value) });
    processing.value = true;
    emits('onProcessing');
}
</script>

<template>
    <form class="flex flex-col gap-3" novalidate @submit.prevent="onSubmit">
        <div v-if="!processing">
            <Input
                class="mb-5"
                v-model="formData.firstName"
                :invalid="{ value: !!(submitted && invalidFirstName), message: t('form.required') }"
                type="text"
                :placeholder="t('character.select.first')"
            ></Input>

            <Input
                class="mb-5"
                v-model="formData.lastName"
                :invalid="{ value: !!(submitted && invalidLastName), message: t('form.required') }"
                type="text"
                :placeholder="t('character.select.last')"
            ></Input>

            <Button class="w-full" type="submit" style-type="primary">
                {{ t('character.creator.save') }}
            </Button>
        </div>

        <div class="font-cap animate-pulse pt-1 font-semibold uppercase" v-else>
            {{ t('character.creator.processing') }}
        </div>
    </form>
</template>
