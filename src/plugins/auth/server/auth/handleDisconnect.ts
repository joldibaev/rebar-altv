import * as alt from 'alt-server';

import { loggedInPlayers } from './index.js';

export function handleDisconnect(player: alt.Player) {
    loggedInPlayers.delete(player.id);
}
