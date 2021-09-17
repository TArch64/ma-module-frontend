import {Component, Inject} from '@angular/core';
import {ConfirmOptions, ConfirmResult, IAdditionalAction} from "@common/confirm";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
    public readonly additionalActionControl?: FormControl;

    constructor(
        private readonly dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private readonly options: ConfirmOptions,
    ) {
        if (this.hasAdditionalAction) {
            this.additionalActionControl = new FormControl(this.options.additionalAction!.initialValue);
        }
    }

    public get bodyText(): string {
        return this.options.text;
    }

    public get confirmActionText(): string {
        return this.options.confirmAction.text;
    }

    public get declineActionText(): string {
        return this.options.declineAction.text;
    }

    public get hasAdditionalAction(): boolean {
        return !!this.options.additionalAction;
    }

    public get additionalActionText(): string | undefined {
        return this.options.additionalAction?.text;
    }

    public confirm(): void {
        const result = ConfirmResult.createConfirmed(this.captureAdditionalValueResult());
        this.complete(result);
    }

    private captureAdditionalValueResult(): IAdditionalAction | null {
        if (!this.hasAdditionalAction) return null;
        return { value: this.additionalActionControl!.value };
    }

    public decline(): void {
        this.complete(ConfirmResult.createDeclined());
    }

    private complete(result: ConfirmResult): void {
        this.dialogRef.close(result);
    }
}
