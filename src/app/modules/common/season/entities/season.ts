export interface ISeasonJSON {
    id: number
    value: number
    active: boolean
    year: number
}

export class Season {
    public static fromJSON(json: ISeasonJSON): Season {
        return new Season(json.id, json.value, json.active, json.year);
    }

    public readonly title = this.buildTitle();

    private constructor(
        public readonly id: number,
        public readonly value: number,
        public readonly active: boolean,
        public readonly year: number
    ) {}

    private buildTitle(): string {
        const year: string = this.active ? 'current' : this.year.toString()
        return `${this.value}th - ${year}`;
    }
}
