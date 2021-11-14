import { IUserJSON, User } from '@common/auth';

export interface IStudentJSON {
    id: string;
    user: IUserJSON;
}

export class Student {
    public static fromJSON(json: IStudentJSON): Student {
        return new Student(json.id, User.fromJSON(json.user));
    }

    private constructor(
        public readonly id: string,
        public readonly user: User
    ) {}
}
