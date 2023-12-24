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
