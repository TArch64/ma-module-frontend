import { InvitationStatuses } from '../enums';

export interface IInvitationJSON {
    email: string;
    status: InvitationStatuses;
    courseNames: string[];
}

export class Invitation {
    public static fromJSON(json: IInvitationJSON): Invitation {
        return new Invitation(json.email, json.status, json.courseNames);
    }

    public id: string = '';
    public readonly isAccepted = this.status === InvitationStatuses.ACCEPTED;

    private constructor(
        public readonly email: string,
        public readonly status: InvitationStatuses,
        public readonly courseNames: string[]
    ) {}
}
