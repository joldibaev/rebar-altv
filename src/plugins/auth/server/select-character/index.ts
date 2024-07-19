import { useRebar } from '@Server/index.js';
import { handleLogin } from './handleLogin.js';
import alt from 'alt-server';
import { CharacterCreatorEvents } from '../../shared/auth.events.js';
import { saveAppearance } from './saveAppearance.js';

const Rebar = useRebar();

export const sessionKey = 'can-change-appearance';

Rebar.events.useEvents().on('account-bound', handleLogin);
alt.onClient(CharacterCreatorEvents.toServer.create, saveAppearance);
