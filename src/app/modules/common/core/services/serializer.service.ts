import {Injectable} from "@angular/core";

export interface ISerializerService {
    fromJSON<T>(json: string): T | null;
    toJSON<T>(value: T): string;
}

@Injectable()
export class SerializerService implements ISerializerService {
    public fromJSON<T>(json: string): T | null {
        try {
            return JSON.parse(json);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public toJSON<T>(value: T): string {
        return JSON.stringify(value);
    }
}
