export interface IAdditionalAction {
    value: boolean;
}

export class ConfirmResult {
    public static createConfirmed(additionalAction: IAdditionalAction | null): ConfirmResult {
        return new ConfirmResult(true, additionalAction);
    }

    public static createDeclined(): ConfirmResult {
        return new ConfirmResult(false, null);
    }

    private constructor(
        public readonly isConfirmed: boolean,
        public readonly additionalAction: IAdditionalAction | null
    ) {}
}
