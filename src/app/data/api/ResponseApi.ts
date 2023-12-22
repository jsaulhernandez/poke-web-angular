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
    species: Common[];
    sprites: any;
    stats: Stat[];
    types: Type[];
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

interface Move {
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

interface Type {
    slot: number;
    type: Common;
}

export interface Generation {
    pokemon_species: Common[];
}
