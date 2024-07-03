import { useRebar } from '@Server/index.js';
import { handleLogin } from './handleLogin.js';

const Rebar = useRebar();

export const sessionKey = 'can-change-appearance';

Rebar.events.useEvents().on('account-bound', handleLogin);
