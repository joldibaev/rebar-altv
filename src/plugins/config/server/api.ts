import * as alt from 'alt-server';

import { useRebar } from '@Server/index.js';

import { ServerConfig } from './config.js';

const Rebar = useRebar();
const API_NAME = 'config-api';

export function useApi() {
    function getConfig() {
        alt.log('lorem');
        return ServerConfig;
    }

    return {
        getConfig,
    };
}

// Declare global to TypeScript recognizes the typings
declare global {
    export interface ServerPlugin {
        [API_NAME]: ReturnType<typeof useApi>;
    }
}

// Really important to execute the return of your function
Rebar.useApi().register(API_NAME, useApi());
