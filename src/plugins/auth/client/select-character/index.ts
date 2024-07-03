import * as alt from 'alt-client';

import { useClonedPed } from '@Client/ped/clone.js';
import { useWebview } from '@Client/webview/index.js';
import { Appearance } from '@Shared/types/appearance.js';

import { CharacterCreatorEvents } from '../../shared/auth.events.js';
import { DefaultAppearance } from '../../shared/defaultAppearance.js';
import { getCreationData } from './helpers.js';
import { AuthConfig } from '../../shared/auth.config.js';
import { DefaultClothes } from '../../shared/defaultClothing.js';

const pedClone = useClonedPed();
const webview = useWebview();

function updateAppearance(appearance: Appearance) {
    void pedClone.ped.update(appearance, DefaultClothes[appearance.sex], {
        pos: new alt.Vector3(AuthConfig.spawnPoint.pos),
        heading: 0,
    });
}

async function createPed(value: boolean) {
    if (value) {
        alt.off('disconnect', pedClone.ped.destroy);
        pedClone.ped.destroy();
        pedClone.camera.destroy();
    } else {
        alt.on('disconnect', pedClone.ped.destroy);
        void pedClone.ped.update(DefaultAppearance, DefaultClothes[DefaultAppearance.sex], {
            pos: new alt.Vector3(AuthConfig.spawnPoint.pos),
            heading: 0,
        });
        await pedClone.camera.create({ bone: 'IK_Root', fov: 60, zOffset: 0.4 });
    }
}

function updateNativeData() {
    webview.emit(CharacterCreatorEvents.toClient.getNativeData, getCreationData());
}

alt.onServer(CharacterCreatorEvents.toClient.createPed, createPed);
webview.on(CharacterCreatorEvents.toClient.updateAppearance, updateAppearance);
webview.on(CharacterCreatorEvents.toClient.getNativeData, updateNativeData);
