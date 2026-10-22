export type Role = {id: number; value: string};

export type User = {id: string; username: string; roles: Role[]};

export type Reaction = {name: string; char: string};
