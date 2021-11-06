import { IPrototype, ISerializable } from '@common/core';

export interface ISeasonJSON {
    id: string
    value: number
    active: boolean
    year: number
}

export class Season implements IPrototype<ISeasonJSON>, ISerializable<ISeasonJSON> {
    public static fromJSON(json: ISeasonJSON): Season {
        return new Season(json.id, json.value, json.active, json.year);
    }

    public readonly title = this.buildTitle();

    private constructor(
        public readonly id: string,
        public readonly value: number,
        public readonly active: boolean,
        public readonly year: number
    ) {}

    private buildTitle(): string {
        const year: string = this.active ? 'current' : this.year.toString();
        return `${this.value}th - ${year}`;
    }

    clone(overrides: Partial<ISeasonJSON> = {}): Season {
        return Season.fromJSON({ ...this.toJSON(), ...overrides });
    }

    toJSON(): ISeasonJSON {
        return {
            id: this.id,
            value: this.value,
            active: this.active,
            year: this.year
        };
    }
}
