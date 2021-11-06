interface IActionOptions {
    text: string;
}

interface IAdditionalActionOptions extends IActionOptions {
    initialValue?: boolean;
}

export interface IConfirmOptions {
    text: string;
    confirmAction?: IActionOptions;
    declineAction?: IActionOptions;
    additionalAction?: IAdditionalActionOptions;
    ignoreDismissEvent?: boolean;
}

export class ConfirmOptions {
    public static create(options: IConfirmOptions): ConfirmOptions {
        return new ConfirmOptions(
            options.text,
            options.confirmAction ?? { text: 'Confirm' },
            options.declineAction ?? { text: 'Cancel' },
            ConfirmOptions.preformatAdditionalAction(options.additionalAction),
            options.ignoreDismissEvent ?? true
        );
    }

    private static preformatAdditionalAction(options?: IAdditionalActionOptions): IAdditionalActionOptions | null {
        if (!options) return null;

        return {
            initialValue: true,
            ...options
        };
    }

    private constructor(
        public readonly text: string,
        public readonly confirmAction: IActionOptions,
        public readonly declineAction: IActionOptions,
        public readonly additionalAction: IAdditionalActionOptions | null,
        public readonly ignoreDismissEvent: boolean
    ) {}
}
