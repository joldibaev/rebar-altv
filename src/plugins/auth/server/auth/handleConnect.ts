import * as alt from 'alt-server';

import { AuthConfig } from '../../shared/auth.config.js';
import { AuthEvents } from '../../shared/auth.events.js';
import { getRememberAccount } from './remember-me.js';
import { sessionKey } from './index.js';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();

const ServerWeather = Rebar.useServerWeather();

export async function handleConnect(player: alt.Player) {
    player.pos = new alt.Vector3(AuthConfig.initial.pos);
    player.rot = new alt.Vector3(AuthConfig.initial.rot);
    player.dimension = player.id + 1;
    player.visible = false;
    player.frozen = true;

    player.setMeta(sessionKey, true);

    // todo weather api
    // Used as a way to store the current weather on server-side for other plugins
    ServerWeather.set('CLEAR');
    Rebar.player.useWorld(player).setWeather(ServerWeather.get(), 0);

    // todo time api
    Rebar.player.useWorld(player).setTime(22, 0, 0);

    player.emit(AuthEvents.toClient.cameraCreate);

    const webView = Rebar.player.useWebview(player);
    webView.show('Auth', 'page');

    const rememberedAccount = await getRememberAccount(player);
    if (rememberedAccount) {
        webView.emit(AuthEvents.fromServer.rememberedAccount, rememberedAccount.email, rememberedAccount.lastLogin);
    }
}
