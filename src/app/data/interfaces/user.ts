export interface User {
    name: string;
    hobbies?: string[];
    dateBirth: string;
    document: string;
    resource: Image;
}

export interface Image {
    base64: string;
    imageName: string;
}
