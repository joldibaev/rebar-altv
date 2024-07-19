import { Appearance } from '@Shared/types/index.js';

export type CharacterName = {
    first: string;
    last: string;
};

export type CreateCharacter = {
    characterName: CharacterName;
    appearance: Appearance;
};
