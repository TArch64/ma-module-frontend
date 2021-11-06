import { Injectable } from '@angular/core';

@Injectable()
export class SerializerService {
    public parse<T>(json: string): T | null {
        try {
            return JSON.parse(json);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public stringify<T>(value: T): string {
        return JSON.stringify(value);
    }
}
