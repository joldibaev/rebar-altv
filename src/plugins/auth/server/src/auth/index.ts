import * as alt from 'alt-server';

import { useRebar } from '@Server/index.js';
import { AuthEvents } from '../../../shared/auth.events.js';
import { handleLogin } from './handleLogin.js';
import { handleRegister } from './handleRegister.js';
import { handleConnect } from './handleConnect.js';
import { handleDisconnect } from './handleDisconnect.js';
import { logInFromRememberMe } from './remember-me.js';

const Rebar = useRebar();
const api = Rebar.useApi();

export const loginCallbacks: Array<(player: alt.Player) => void> = [];
export const loggedInPlayers: Map<number, string> = new Map<number, string>();

export const sessionKey = 'can-authenticate';

const configApi = await api.getAsync('config-api');
if (!configApi.getConfig().noClip) {
    alt.on('playerConnect', handleConnect);
    alt.on('playerDisconnect', handleDisconnect);
    alt.onClient(AuthEvents.toServer.login, handleLogin);
    alt.onClient(AuthEvents.toServer.register, handleRegister);
    alt.onClient(AuthEvents.toServer.remember.login, logInFromRememberMe);
}
