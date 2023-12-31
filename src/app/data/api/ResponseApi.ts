export interface ResponseApi<T extends unknown> {
    count: number;
    next: string;
    previous: string;
    results: T;
}

export interface DataBasePokemon {
    name: string;
    url: string;
}

export interface DataPokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    location_area_encounters: string;
    order: number;
    weight: number;
    abilities: Ability[];
    forms: Common[];
    game_indices: GameIndice[];
    moves: Move[];
    species: Common;
    sprites: any;
    stats: Stat[];
    types: Type[];
    data_species: Specie;
}

interface Ability {
    ability: Common;
    is_hidden: boolean;
    slot: number;
}

export interface Common {
    name: string;
    url: string;
}

interface GameIndice {
    game_index: number;
    version: Common;
}

export interface Move {
    move: Common;
    version_group_details: VersionGroupDetail[];
}

interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: Common;
    version_group: Common;
}

interface Stat {
    base_stat: number;
    effort: number;
    stat: Common;
}

export interface Type {
    slot: number;
    type: Common;
}

export interface Generation {
    pokemon_species: Common[];
}

export interface Specie {
    color: Common;
    flavor_text_entries: {
        flavor_text: string;
        version: Common;
        language: Common;
    }[];
    generation: Common;
    pokedex_numbers: { entry_number: number; pokedex: Common }[];
    evolution_chain: { url: string };
}

export interface EvolutionChain {
    chain: {
        evolves_to: {
            evolves_to: { species: Common }[];
            species: Common;
        }[];
        species: Common;
    };
}

export interface Move {
    name: string;
    type: Common;
    priority: number; //Prioridad
    accuracy: number; //Precisión
    power: number; //poder
    pp: number; //Mostrar PP Max
    effect_entries: Effect[];
    effect_chance: number;
    meta: {
        category: Common;
        crit_rate: number; //Radio de crítico
        flinch_chance: number; //Probabilidad de retroceder
    };
}

export interface Effect {
    effect: string;
    short_effect: string;
    language: Common;
}

export interface Item {
    name: string;
    category: Common;
    cost: number;
    attributes: Common[];
    effect_entries: Effect[];
    sprites: { default: string };
}
