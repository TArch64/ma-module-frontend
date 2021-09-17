import {IUserJSON, User} from "@common/auth";
import {MentorRoles} from "../enums";
import {IPrototype} from "@common/core";

export interface IMentorJSON {
    id: number;
    role: MentorRoles;
    user: IUserJSON;
}

export class Mentor implements IPrototype<IMentorJSON> {
    public static fromJSON(json: IMentorJSON): Mentor {
        return new Mentor(json.id, json.role, User.fromJSON(json.user));
    }

    public readonly isLead = this.role === MentorRoles.LEAD;

    private constructor(
        public readonly id: number,
        public readonly role: MentorRoles,
        public readonly user: User
    ) {}

    public clone(overrides: Partial<IMentorJSON> = {}): Mentor {
        return Mentor.fromJSON({
            ...this,
            user: this.user.clone(),
            ...overrides
        })
    }
}
