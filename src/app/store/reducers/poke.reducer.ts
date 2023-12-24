import { createReducer, on } from '@ngrx/store';

import { PokeState } from '../states/poke.state';
import * as PokeActions from '../actions/poke.action';

import { User } from 'src/app/data/interfaces/user';

const pokeInitialState: PokeState = {
    user: {} as User,
};

export const pokeReducer = createReducer(
    pokeInitialState,
    on(PokeActions.addUser, (state, action) => {
        return {
            ...state,
            user: action.data ?? state.user,
        };
    }),
    on(PokeActions.cleanStore, (state, action) => {
        return {
            user: {} as User,
        };
    })
);
