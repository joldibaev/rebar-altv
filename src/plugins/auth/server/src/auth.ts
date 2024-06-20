import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { AuthEvents } from '../../shared/auth.events.js';
import { AuthConfig } from '../../shared/auth.config.js';

const Rebar = useRebar();

const sessionKey = 'can-authenticate';

function handleConnect(player: alt.Player) {
    player.pos = new alt.Vector3(AuthConfig.initial.pos);
    player.rot = new alt.Vector3(AuthConfig.initial.rot);
    player.dimension = player.id + 1;
    player.setMeta(sessionKey, true);

    player.emit(AuthEvents.toClient.cameraCreate);
}

alt.on('playerConnect', handleConnect);