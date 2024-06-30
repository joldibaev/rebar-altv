import { useRebar } from '@Server/index.js';

import './api.js';

const Rebar = useRebar();

const serverConfig = Rebar.useServerConfig();

// Hide minimap when a page is opened
serverConfig.set('hideMinimapInPage', true);

// Disable pistol whipping entirely
serverConfig.set('disablePistolWhip', true);

// Disable starting vehicle engine when entering vehicle
serverConfig.set('disableVehicleEngineAutoStart', true);

// Disable stopping vehicle engine when leaving a vehicle
serverConfig.set('disableVehicleEngineAutoStop', true);
