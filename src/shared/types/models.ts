export interface Role {
    id: number;
    value: string;
}

export interface User {
    id: string;
    username: string;
    roles: Role[];
}

export interface Emoji {
    id: string;
    character: string;
}
