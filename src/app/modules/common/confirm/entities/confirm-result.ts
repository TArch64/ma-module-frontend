export class ConfirmResult {
    public static createConfirmed(): ConfirmResult {
        return new ConfirmResult(true);
    }

    public static createDeclined(): ConfirmResult {
        return new ConfirmResult(false);
    }

    private constructor(
        public readonly isConfirmed: boolean
    ) {}
}
