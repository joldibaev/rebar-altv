import { useRebar } from '@Server/index.js';

import { ServerConfig } from './config.js';

import './api.js';

const Rebar = useRebar();

const serverConfig = Rebar.useServerConfig();

// Hide minimap when a page is opened
serverConfig.set('hideMinimapInPage', ServerConfig.hideMinimapInPage);

// Disable pistol whipping entirely
serverConfig.set('disablePistolWhip', ServerConfig.disablePistolWhip);

// Disable starting vehicle engine when entering vehicle
serverConfig.set('disableVehicleEngineAutoStart', ServerConfig.disableVehicleEngineAutoStart);

// Disable stopping vehicle engine when leaving a vehicle
serverConfig.set('disableVehicleEngineAutoStop', ServerConfig.disableVehicleEngineAutoStop);

// Hide street names
serverConfig.set('hideStreetName', ServerConfig.hideStreetName);

// Hide area name
serverConfig.set('hideAreaName', ServerConfig.hideAreaName);
