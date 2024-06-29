import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { AuthEvents } from '../../../shared/auth.events.js';
import { AuthConfig } from '../../../shared/auth.config.js';
import { handleLogin } from './handleLogin.js';
import { handleRegister } from './handleRegister.js';

const Rebar = useRebar();
const ServerWeather = Rebar.useServerWeather();

export const loginCallbacks: Array<(player: alt.Player) => void> = [];
export const loggedInPlayers: Map<number, string> = new Map<number, string>();

export const sessionKey = 'can-authenticate';

function handleConnect(player: alt.Player) {
    player.pos = new alt.Vector3(AuthConfig.initial.pos);
    player.rot = new alt.Vector3(AuthConfig.initial.rot);
    player.dimension = player.id + 1;

    player.setMeta(sessionKey, true);

    // todo weather api
    // Used as a way to store the current weather on server-side for other plugins
    ServerWeather.set('CLEAR');
    Rebar.player.useWorld(player).setWeather(ServerWeather.get(), 0);

    // todo time api
    Rebar.player.useWorld(player).setTime(22, 0, 0);

    player.emit(AuthEvents.toClient.cameraCreate);
}

function handleDisconnect(player: alt.Player) {
    loggedInPlayers.delete(player.id);
}

alt.on('playerConnect', handleConnect);
alt.on('playerDisconnect', handleDisconnect);
alt.onClient(AuthEvents.toServer.login, handleLogin);
alt.onClient(AuthEvents.toServer.register, handleRegister);
