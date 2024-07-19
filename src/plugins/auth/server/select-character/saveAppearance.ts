import alt from 'alt-server';

import { sessionKey } from './index.js';
import { useTranslate } from '@Shared/translate.js';
import { useRebar } from '@Server/index.js';
import { CharacterCreatorEvents } from '../../shared/auth.events.js';
import { CreateCharacter } from '../../shared/auth.type.js';
import { Character } from '@Shared/types/index.js';
import { CollectionNames } from '@Server/document/shared.js';
import { getCharacter } from './getCharacter.js';

const Rebar = useRebar();
const db = Rebar.database.useDatabase();
const { t } = useTranslate('en');

export async function saveAppearance(player: alt.Player, { characterName, appearance }: CreateCharacter) {
    if (!player.getMeta(sessionKey)) {
        player.kick(t('character.creator.unable.to.save'));
        return;
    }

    const accDocument = Rebar.document.account.useAccount(player);
    if (!accDocument) {
        player.kick(t('character.select.no.account'));
        return;
    }

    const id = await db.create<Character>(
        { account_id: accDocument.getField('_id'), name: [characterName.first, characterName.last].join('_') },
        CollectionNames.Characters,
    );

    const character = await getCharacter(player, id);
    if (!character) {
        player.kick(t('character.select.no.account'));
    }

    Rebar.document.character.useCharacterBinder(player).bind(character);

    const characterDoc = Rebar.document.character.useCharacter(player);
    if (!characterDoc) {
        player.kick(t('character.creator.unable.to.save'));
        return;
    }

    const webView = Rebar.player.useWebview(player);
    webView.hide('CharacterCreator');

    player.deleteMeta(sessionKey);

    console.log(appearance);

    await characterDoc.set('appearance', appearance);
    Rebar.player.usePlayerAppearance(player).update();
    Rebar.player.useClothing(player).update();

    player.emit(CharacterCreatorEvents.toClient.ped, true);

    player.frozen = false;
    player.visible = true;
    const wPlayer = Rebar.player.useWorld(player);
    wPlayer.enableControls();
    wPlayer.disableCameraControls(false);
    wPlayer.disableAttackControls(false);

    // invokeCreate(player);
}
