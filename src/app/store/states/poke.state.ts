import { DataPokemon } from 'src/app/data/api/ResponseApi';
import { User } from 'src/app/data/interfaces/user';

export interface PokeState {
    user: User;
    pokemons: DataPokemon[];
    isLoggedIn: boolean;
}
