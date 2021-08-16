import {UserRoles} from "../enums";

export interface IUserJSON {
    id: number;
    username: string;
    role: UserRoles;
}

export class User {
    public static fromJSON(json: IUserJSON): User {
        return new User(json.id, json.username, json.role);
    }

    private constructor(
        public readonly id: number,
        public readonly username: string,
        public readonly role: UserRoles
    ) {}
}
