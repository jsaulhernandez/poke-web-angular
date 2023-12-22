type methods = 'POST' | 'PUT' | 'GET';

export interface OptionRequest {
    method: methods;
    path: string;
    params?: Record<string, string>;
}
