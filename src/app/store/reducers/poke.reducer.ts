import { createReducer, on } from '@ngrx/store';

import { PokeState } from '../states/poke.state';
import * as PokeActions from '../actions/poke.action';

import { User } from 'src/app/data/interfaces/user';

const pokeInitialState: PokeState = {
    user: {} as User,
    pokemons: [],
    isLoggedIn: false,
};

export const pokeReducer = createReducer(
    pokeInitialState,
    on(PokeActions.addUser, (state, action) => {
        return {
            ...state,
            user: action.data,
        };
    }),
    on(PokeActions.addSelectedPokemons, (state, action) => {
        return {
            ...state,
            pokemons: action.pokemons,
            isLoggedIn: action.isLoggedIn,
        };
    }),
    on(PokeActions.updateUserData, (state, action) => {
        return {
            ...state,
            user: action.data ?? state.user,
        };
    }),
    on(PokeActions.updateSelectedPokemons, (state, action) => {
        return {
            ...state,
            pokemons: action.pokemons ?? state.pokemons,
        };
    }),
    on(PokeActions.cleanStore, (state, action) => {
        return {
            user: {} as User,
            pokemons: [],
            isLoggedIn: false,
        };
    })
);
