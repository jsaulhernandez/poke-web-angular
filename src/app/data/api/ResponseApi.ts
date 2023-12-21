export interface ResponseApi<T extends unknown> {
    count: number;
    next: string;
    previous: string;
    results: T;
}

export interface Pokemon {
    name: string;
    url: string;
}
