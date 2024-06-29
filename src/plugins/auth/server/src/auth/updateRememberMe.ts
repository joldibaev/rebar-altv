import alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { Account } from '@Shared/types/index.js';

const Rebar = useRebar();
const db = Rebar.database.useDatabase();

type AccountData = { token: string } & Account;

function getHash(player: alt.Player) {
    return Rebar.utility.sha256(
        player.ip + player.hwidHash + player.hwidExHash + player.socialID + player.socialClubName,
    );
}

export async function updateRememberMe(player: alt.Player, _id: string) {
    await db.update<AccountData>({ _id, token: getHash(player) }, Rebar.database.CollectionNames.Accounts);
}
