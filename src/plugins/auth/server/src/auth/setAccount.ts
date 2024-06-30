import * as alt from 'alt-server';

import { useRebar } from '@Server/index.js';
import { Account } from '@Shared/types/index.js';

import { sessionKey } from './index.js';
import { AuthEvents } from '../../../shared/auth.events.js';

const Rebar = useRebar();

export async function setAccount(player: alt.Player, account: Account) {
    const document = Rebar.document.account.useAccountBinder(player).bind(account);
    await document.set('lastLogin', Date.now());

    Rebar.player.useWebview(player).hide('Auth');

    player.dimension = 0;
    player.emit(AuthEvents.toClient.cameraDestroy);
    player.deleteMeta(sessionKey);
}
