type methods = 'POST' | 'PUT' | 'GET';

export interface OptionRequest<T = unknown> {
    method: methods;
    path: string;
    params?: Record<string, string>;
    data?: T;
    skip?: boolean;
}
