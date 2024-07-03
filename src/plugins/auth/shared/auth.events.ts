export const AuthEvents = {
    toServer: {
        login: 'auth:event:login',
        register: 'auth:event:register',
        remember: {
            logout: 'auth:event:remember:logout',
            login: 'auth:event:remember:login',
        },
    },
    toClient: {
        remember: 'auth:event:remember',
        cameraCreate: 'auth:event:camera:create',
        cameraDestroy: 'auth:event:camera:destroy',
    },
    fromServer: {
        invalidCredentials: 'auth:event:invalid:login',
        userAlreadyExists: 'auth:event:invalid:register',
        rememberedAccount: 'auth:event:rememberedAccou',
    },
};

export const CharacterSelectEvents = {
    toServer: {},
    toClient: {},
};

export const CharacterCreatorEvents = {
    toServer: {
        create: 'character:creator:create',
    },
    toClient: {
        createPed: 'character:creator:createPed',
        updateAppearance: 'character:creator:update:appearance',
        getNativeData: 'character:creator:get:native:data',
    },
};
