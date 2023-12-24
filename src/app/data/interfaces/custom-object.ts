import { Common } from '../api/ResponseApi';

export interface CustomObject {
    name: string;
    category: string;
    cost: string;
    image: string;
    effect: string;
    shortEffect: string;
    attributes: Common[];
}
