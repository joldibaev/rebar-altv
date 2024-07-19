import alt from 'alt-server';
import { Character } from '@Shared/types/index.js';
import { CollectionNames } from '@Server/document/shared.js';
import { sessionKey } from './index.js';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();
const db = Rebar.database.useDatabase();

export async function getCharacter(player: alt.Player, id: string): Promise<Character | undefined> {
    if (!player.getMeta(sessionKey)) {
        return undefined;
    }

    const accDocument = Rebar.document.account.useAccount(player);
    if (!accDocument) {
        return undefined;
    }

    return await db.get<Character>({ account_id: accDocument.getField('_id'), _id: id }, CollectionNames.Characters);
}
