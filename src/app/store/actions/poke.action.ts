import { createAction, props } from '@ngrx/store';
import { DataPokemon } from 'src/app/data/api/ResponseApi';

import { User } from 'src/app/data/interfaces/user';

enum PokeActionType {
    ADD_USER_DATA = '[App Component] Add User Data',
    ADD_SELECTED_POKEMONS = '[App Component] UAdd Selected Pokemons',
    UPDATE_USER_DATA = '[App Component] Update User Data',
    CLEAN_GLOBAL_STORE = '[App Component] Clean Global Store',
}

export const addUser = createAction(
    PokeActionType.ADD_USER_DATA,
    props<{ data: User }>()
);

export const addSelectedPokemons = createAction(
    PokeActionType.ADD_SELECTED_POKEMONS,
    props<{ pokemons: DataPokemon[]; isLoggedIn: boolean }>()
);

export const updateUserData = createAction(
    PokeActionType.UPDATE_USER_DATA,
    props<{ data: User; pokemons: DataPokemon[] }>()
);

export const cleanStore = createAction(PokeActionType.CLEAN_GLOBAL_STORE);
