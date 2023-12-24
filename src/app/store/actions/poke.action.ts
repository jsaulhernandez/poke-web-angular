import { createAction, props } from '@ngrx/store';

import { User } from 'src/app/data/interfaces/user';

enum PokeActionType {
    ADD_USER_DATA = '[App Component] Add User Data',
    UPDATE_USER_DATA = '[App Component] Update User Data',
    CLEAN_GLOBAL_STORE = '[App Component] Clean Global Store',
}

export const addUser = createAction(
    PokeActionType.ADD_USER_DATA,
    props<{ data: User }>()
);
