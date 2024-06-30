import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { Account } from '@Shared/types/account.js';
import { useTranslate } from '@Shared/translate.js';
import { AuthEvents } from '../../../shared/auth.events.js';
import { setAccount } from './setAccount.js';
import { AuthLoginProps, AuthRegisterProps } from '@Plugins/auth/shared/auth.interface.js';

const Rebar = useRebar();

const { t } = useTranslate('en');

const sessionKey = 'can-authenticate';
const db = Rebar.database.useDatabase();

export async function handleRegister(player: alt.Player, { email, password }: AuthRegisterProps) {
    if (!player.getMeta(sessionKey)) {
        player.kick(t('auth.kick.sessionKey'));
        return;
    }

    let account = await db.get<Account>({ email }, Rebar.database.CollectionNames.Accounts);
    const webview = Rebar.player.useWebview(player);
    if (account) {
        webview.emit(AuthEvents.fromServer.userAlreadyExists);
        return;
    }

    const _id = await db.create<Partial<Account>>(
        { email, password: Rebar.utility.password.hash(password) },
        Rebar.database.CollectionNames.Accounts,
    );
    if (!_id) {
        webview.emit(AuthEvents.fromServer.userAlreadyExists);
        return;
    }

    account = await db.get<Account>({ _id }, Rebar.database.CollectionNames.Accounts);
    if (!account) {
        webview.emit(AuthEvents.fromServer.userAlreadyExists);
        return;
    }

    setAccount(player, account);
}
