<script lang="ts" setup>
import { ref, computed } from 'vue';
import { PLUGIN_IMPORTS } from '../../pages/plugins';
import { usePages } from '../../composables/usePages';

const { show, hide } = usePages();

const showToolbar = ref(false);
const visiblePages = ref<{ [key: string]: boolean }>({});

function isVisible(pageName: string) {
    return visiblePages.value[pageName] ? true : false;
}

function togglePage(pageName: string) {
    const isVisible = visiblePages.value[pageName] ? true : false;
    if (isVisible) {
        hide(pageName);
    } else {
        show(pageName, 'page');
    }
    visiblePages.value[pageName] = isVisible ? false : true;
}

const pages = computed(() => {
    return Object.keys(PLUGIN_IMPORTS);
});
</script>

<template>
    <div class="fixed right-0 top-0">
        <div v-if="showToolbar" class="items-center justify-center p-4">
            <div class="flex flex-col bg-white shadow-lg w-72 rounded p-4 gap-2">
                <div
                    v-for="(pageName, index) in pages"
                    :key="index"
                    class="flex justify-between w-full rounded p-2 hover:opacity-50 hover:cursor-pointer"
                    :class="isVisible(pageName) ? ['bg-primary'] : ['bg-white']"
                    @click="togglePage(pageName)"
                >
                    <span class="text-sm font-bold">{{ pageName }}</span>
                </div>
                <div
                    class="font-bold text-sm text-neutral-600 text-right p-2 hover:cursor-pointer rounded"
                    @click="showToolbar = false"
                >
                    Close
                </div>
            </div>
        </div>
        <div v-else @click="showToolbar = true" class="p-4">
            <div
                class="text-sm font-bold bg-white rounded-md py-1 px-2 hover:cursor-pointer shadow"
            >
                &lt;
            </div>
        </div>
    </div>
</template>
