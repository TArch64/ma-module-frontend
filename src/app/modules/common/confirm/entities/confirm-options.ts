interface IActionOptions {
    text: string;
}

export interface IConfirmOptions {
    text: string;
    confirmAction?: IActionOptions;
    declineAction?: IActionOptions;
    ignoreDismissEvent?: boolean;
}

export class ConfirmOptions {
    public static create(options: IConfirmOptions): ConfirmOptions {
        return new ConfirmOptions(
            options.text,
            options.confirmAction ?? { text: 'Confirm' },
            options.declineAction ?? { text: 'Cancel' },
            options.ignoreDismissEvent ?? true
        );
    }

    private constructor(
        public readonly text: string,
        public readonly confirmAction: IActionOptions,
        public readonly declineAction: IActionOptions,
        public readonly ignoreDismissEvent: boolean,
    ) {}
}
