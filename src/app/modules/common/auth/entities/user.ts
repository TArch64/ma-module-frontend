import {UserRoles} from "../enums";

export interface IUserJSON {
    id: number;
    username: string;
    role: UserRoles;
}

export class User {
    public static readonly FAKE_AVATAR_URL = 'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat4&accessoriesType=Blank&hatColor=Red&facialHairType=BeardMajestic&facialHairColor=BlondeGolden&clotheType=BlazerShirt&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=Default&skinColor=Brown';

    public static fromJSON(json: IUserJSON): User {
        return new User(
            json.id,
            json.username,
            json.role,
            User.FAKE_AVATAR_URL
        );
    }

    private constructor(
        public readonly id: number,
        public readonly username: string,
        public readonly role: UserRoles,
        public readonly avatarUrl: string
    ) {}
}
