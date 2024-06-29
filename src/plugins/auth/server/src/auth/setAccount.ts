import alt from 'alt-server';
import { Account } from '@Shared/types/index.js';
import { sessionKey } from './index.js';
import { AuthEvents } from '../../../shared/auth.events.js';
import { useRebar } from '@Server/index.js';
import { invokeOnLogin } from './api.js';

const Rebar = useRebar();

export function setAccount(player: alt.Player, account: Account) {
    Rebar.document.account.useAccountBinder(player).bind(account);
    Rebar.player.useWebview(player).hide('Auth');

    player.dimension = 0;
    player.emit(AuthEvents.toClient.cameraDestroy);
    player.deleteMeta(sessionKey);

    invokeOnLogin(player);
}
