import * as alt from 'alt-server';
import { AuthConfig } from '../../shared/auth.config.js';
import { useRebar } from '@Server/index.js';
import { sessionKey } from './index.js';
import { CharacterCreatorEvents } from '../../shared/auth.events.js';

const Rebar = useRebar();

async function showAppearanceMenu(player: alt.Player) {
    player.setMeta(sessionKey, true);

    player.emit(CharacterCreatorEvents.toClient.ped, false);

    const wPlayer = Rebar.player.useWorld(player);
    wPlayer.disableControls();
    wPlayer.disableCameraControls(true);
    wPlayer.disableAttackControls(true);

    const webview = Rebar.player.useWebview(player);
    webview.hide('Auth');
    webview.show('CharacterCreator', 'page');
}

export async function handleLogin(player: alt.Player) {
    player.spawn(AuthConfig.spawnPoint.pos);
    player.pos = new alt.Vector3(AuthConfig.spawnPoint.pos);
    player.rot = new alt.Vector3(AuthConfig.spawnPoint.rot);
    player.frozen = true;
    player.visible = false;

    void showAppearanceMenu(player);
}
