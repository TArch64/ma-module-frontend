import { IUserJSON, User } from '@common/auth';
import { IPrototype } from '@common/core';
import { MentorRoles } from '../enums';

export interface IMentorJSON {
    id: string;
    role: MentorRoles;
    user: IUserJSON;
}

export class Mentor implements IPrototype<IMentorJSON> {
    public static fromJSON(json: IMentorJSON): Mentor {
        return new Mentor(json.id, json.role, User.fromJSON(json.user));
    }

    public readonly isLead = this.role === MentorRoles.LEAD;
    public readonly isRegular = this.role === MentorRoles.MENTOR;

    private constructor(
        public readonly id: string,
        public readonly role: MentorRoles,
        public readonly user: User
    ) {}

    public clone(overrides: Partial<IMentorJSON> = {}): Mentor {
        return Mentor.fromJSON({
            ...this,
            user: this.user.clone(),
            ...overrides
        });
    }
}
