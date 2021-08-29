export interface IManagerStateJSON {
    isAnySeasonActive: boolean
}

export class ManagerState {
    public static fromJSON(json: IManagerStateJSON): ManagerState {
        return new ManagerState(json.isAnySeasonActive)
    }

    private constructor(
        public readonly isAnySeasonActive: boolean
    ) {}
}
