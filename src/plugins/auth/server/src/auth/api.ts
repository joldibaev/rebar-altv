import * as alt from 'alt-server';
import { loginCallbacks } from './index.js';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();

export function invokeOnLogin(player: alt.Player) {
    for (let cb of loginCallbacks) {
        cb(player);
    }
}

export function useAuth() {
    function onLogin(callback: (player: alt.Player) => void) {
        loginCallbacks.push(callback);
    }

    return {
        onLogin,
    };
}

declare global {
    export interface ServerPlugin {
        ['auth-api']: ReturnType<typeof useAuth>;
    }
}

Rebar.useApi().register('auth-api', useAuth());
