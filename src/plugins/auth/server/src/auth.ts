import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { AuthEvents } from '../../shared/auth.events.js';
import { AuthConfig } from '../../shared/auth.config.js';

const Rebar = useRebar();
const ServerWeather = Rebar.useServerWeather();

const sessionKey = 'can-authenticate';

function handleConnect(player: alt.Player) {
    player.pos = new alt.Vector3(AuthConfig.initial.pos);
    player.rot = new alt.Vector3(AuthConfig.initial.rot);
    player.dimension = player.id + 1;
    player.setMeta(sessionKey, true);

    // Used as a way to store the current weather on server-side for other plugins
    ServerWeather.set('CLEAR');

    Rebar.player.useWorld(player).setTime(22, 0, 0);
    Rebar.player.useWorld(player).setWeather(ServerWeather.get(), 0);

    player.emit(AuthEvents.toClient.cameraCreate);
}

alt.on('playerConnect', handleConnect);
