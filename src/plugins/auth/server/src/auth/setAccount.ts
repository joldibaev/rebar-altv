import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { Account } from '@Shared/types/index.js';

import { sessionKey } from './index.js';
import { AuthEvents } from '../../../shared/auth.events.js';
import { invokeOnLogin } from './api.js';

const Rebar = useRebar();

export async function setAccount(player: alt.Player, account: Account) {
    const document = Rebar.document.account.useAccountBinder(player).bind(account);
    await document.set('lastLogin', Date.now());

    Rebar.player.useWebview(player).hide('Auth');

    player.dimension = 0;
    player.emit(AuthEvents.toClient.cameraDestroy);
    player.deleteMeta(sessionKey);

    invokeOnLogin(player);

    player.spawn(-169.286, 486.4938, 137.4436);
    player.model = 'mp_m_freemode_01';
    player.frozen = false;
    player.visible = true;
}
