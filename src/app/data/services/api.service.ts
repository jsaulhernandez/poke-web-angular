import { Injectable, inject } from '@angular/core';

import { API_URL } from '../constants';
import { HttpClient, HttpParams } from '@angular/common/http';

import { OptionRequest } from '../api/OptionRequest';
import { ResponseApi } from '../api/ResponseApi';

type OptionalData<T, R> = R extends undefined ? T : R;

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    URL: string = API_URL;
    protected httpClient = inject(HttpClient);

    request<T = unknown, R = undefined>(req: OptionRequest) {
        const httpOptions = {
            params: new HttpParams({ fromObject: req.params }),
        };

        return this.httpClient.request<ResponseApi<OptionalData<T, R>>>(
            req.method,
            `${this.URL}/${req.path}`,
            httpOptions
        );
    }

    getDataPokemonByName<T extends unknown>(path: string) {
        return this.httpClient.request<T>('GET', `${this.URL}/${path}`);
    }

    getDataPokemonByUrl<T extends unknown>(url: string) {
        return this.httpClient.request<T>('GET', url);
    }
}
