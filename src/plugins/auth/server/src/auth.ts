import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { AuthEvents } from '../../shared/auth.events.js';
import { AuthConfig } from '../../shared/auth.config.js';
import { Account } from '@Shared/types/account.js';
import { AuthLoginProps } from '@Plugins/auth/shared/auth.interface.js';
import { useTranslate } from '@Shared/translate.js';

const { t } = useTranslate('en');

const Rebar = useRebar();
const ServerWeather = Rebar.useServerWeather();
const db = Rebar.database.useDatabase();

const sessionKey = 'can-authenticate';

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

async function handleLogin(player: alt.Player, { email, password, rememberMe }: AuthLoginProps) {
    if (!player.getMeta(sessionKey)) {
        // player.kick(t('auth.kick.sessionKey'));
        return;
    }

    const webview = Rebar.player.useWebview(player);

    const account = await db.get<Account>({ email }, Rebar.database.CollectionNames.Accounts);
    if (!account) {
        webview.emit(AuthEvents.fromServer.invalidLogin);
        return;
    }

    if (!Rebar.utility.password.check(password, account.password)) {
        webview.emit(AuthEvents.fromServer.invalidLogin);
        return;
    }

    // if (Object.values(loggedInPlayers).includes(account._id)) {
    //     player.kick(t('auth.kick.alreadyLoggedIn'));
    //     return;
    // }

    // if (rememberMe) {
    //     await updateRememberMe(player, account._id);
    // }

    // setAccount(player, account);
}

alt.on('playerConnect', handleConnect);
alt.onClient(AuthEvents.toServer.login, handleLogin);
