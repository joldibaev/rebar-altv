import * as alt from 'alt-client';
import * as native from 'natives';
import { AuthEvents } from '../../shared/auth.events.js';
import { useRebarClient } from '@Client/index.js';
import { AuthConfig } from '../../shared/auth.config.js';

const Rebar = useRebarClient();

let camera: number;
let interval: number;

function rotateCamera() {
    const camRot = native.getCamRot(camera, 2);
    native.setCamRot(camera, camRot.x, camRot.y, camRot.z + 0.025, 2);
}

function createCamera() {
    if (typeof camera !== 'undefined') {
        return;
    }

    const { x, y, z } = AuthConfig.initial.pos;
    const { x: rx, y: ry, z: rz } = AuthConfig.initial.rot;

    interval = alt.setInterval(rotateCamera, 0);
    camera = native.createCamWithParams(
        'DEFAULT_SCRIPTED_CAMERA',
        x,
        y,
        z + 0.2,
        rx,
        ry,
        rz,
        55,
        false,
        1
    );

    native.setCamFov(camera, 80);
    native.setCamActive(camera, true);
    native.renderScriptCams(true, false, 1000, false, false, 0);
    native.displayRadar(false);
    alt.toggleGameControls(false);
}

function destroyCamera() {
    if (typeof camera === 'undefined') {
        return;
    }

    native.destroyAllCams(true);
    native.setCamActive(camera, false);
    native.renderScriptCams(false, false, 0, false, false, 0);
    native.displayRadar(true);
    alt.toggleGameControls(true);
    alt.clearInterval(interval);
    interval = undefined;
}

function openAuth() {
    const webview = Rebar.webview.useWebview();
    webview.show('Auth', 'page');
}

alt.onServer(AuthEvents.toClient.cameraCreate, () => {
    createCamera();
    openAuth();
});
alt.onServer(AuthEvents.toClient.cameraDestroy, destroyCamera);