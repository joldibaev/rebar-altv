import { useRebar } from '@Server/index.js';

const Rebar = useRebar();

const serverConfig = Rebar.useServerConfig();

// Hide minimap when a page is opened
serverConfig.set('hideMinimapInPage', true);