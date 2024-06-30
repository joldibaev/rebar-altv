import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { useTranslate } from '@Shared/translate.js';

import { AuthLoginProps } from '../../../shared/auth.interface.js';
import { Account } from '@Shared/types/index.js';
import { AuthEvents } from '../../../shared/auth.events.js';
import { updateRememberMe } from './remember-me.js';
import { loggedInPlayers, sessionKey } from './index.js';
import { setAccount } from './setAccount.js';

const Rebar = useRebar();
const db = Rebar.database.useDatabase();
const { t } = useTranslate('en');

export async function handleLogin(player: alt.Player, { email, password, rememberMe }: AuthLoginProps) {
    if (!player.getMeta(sessionKey)) {
        player.kick(t('auth.kick.sessionKey'));
        return;
    }

    const webview = Rebar.player.useWebview(player);

    const account = await db.get<Account>({ email }, Rebar.database.CollectionNames.Accounts);
    if (!account) {
        webview.emit(AuthEvents.fromServer.invalidCredentials);
        return;
    }

    if (!Rebar.utility.password.check(password, account.password)) {
        webview.emit(AuthEvents.fromServer.invalidCredentials);
        return;
    }

    if (Object.values(loggedInPlayers).includes(account._id)) {
        player.kick(t('auth.kick.alreadyLoggedIn'));
        return;
    }

    if (rememberMe) {
        await updateRememberMe(player, account._id);
    }

    void setAccount(player, account);
}
