import { ISerializable } from '@common/core';

export interface IRegisterInfo {
    username: string;
    password: string;
}

export class RegisterInfo implements ISerializable<IRegisterInfo> {
    public static fromJSON(json: IRegisterInfo): RegisterInfo {
        return new RegisterInfo(json.username, json.password);
    }

    constructor(
        public username: string,
        public password: string
    ) {}

    public toJSON(): IRegisterInfo {
        return {
            username: this.username,
            password: this.password
        };
    }
}
