import { environment } from 'src/environments/environment';

export const API_URL = environment.pokeApiURL;

export const MY_FORMATS = {
    parse: {
        dateInput: 'dd/MM/yyyy',
    },
    display: {
        dateInput: 'dd/MM/yyyy',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'dd/MM/yyyy',
        monthYearA11yLabel: 'MMM yyyy',
    },
};

export const HOBBIES = [
    'Play Soccer',
    'Play Basketball',
    'Play Tennis',
    'Play Volleyball',
    'Play Fifa',
    'Play Video Games',
];

export const TOTAL_POKEMONS = 100;

export const enum PATHS {
    POKEMON = 'pokemon',
    GENERATION = 'generation',
    VERSION = 'version',
    TYPE = 'type',
    ABILITY = 'ability',
    MOVE = 'move',
    MOVE_CATEGORY = 'move-category',
    ITEM = 'item',
    POKEMON_SPECIES = 'pokemon-species',
}
