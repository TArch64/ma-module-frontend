import { UserRoles } from '../enums';
import { IUserJSON, User } from './user';

export interface IInsecureUserJSON extends IUserJSON {
    email: string;
}

export class InsecureUser extends User {
    public static fromJSON(json: IInsecureUserJSON): InsecureUser {
        return new InsecureUser(
            json.id,
            json.username,
            json.role,
            InsecureUser.FAKE_AVATAR_URL,
            json.email
        );
    }

    private constructor(
        id: string,
        username: string,
        role: UserRoles,
        avatarUrl: string,
        public readonly email: string
    ) {
        super(id, username, role, avatarUrl);
    }

    public clone(overrides: Partial<IInsecureUserJSON> = {}): InsecureUser {
        return InsecureUser.fromJSON({ ...this, ...overrides });
    }
}
