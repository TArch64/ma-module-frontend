export interface IPendingInvitationJSON {
    id: string;
    email: string;
}

export class PendingInvitation {
    public static fromJSON(json: IPendingInvitationJSON): PendingInvitation {
        return new PendingInvitation(json.id, json.email);
    }

    constructor(
        public readonly id: string,
        public readonly email: string
    ) {}
}
