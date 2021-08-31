import {Component, Inject} from '@angular/core';
import {ConfirmOptions, ConfirmResult} from "@common/confirm/entities";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
    constructor(
        private readonly dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private readonly options: ConfirmOptions,
    ) {}

    public get bodyText(): string {
        return this.options.text;
    }

    public get confirmActionText(): string {
        return this.options.confirmAction.text;
    }

    public get declineActionText(): string {
        return this.options.declineAction.text;
    }

    public confirm(): void {
        this.complete(ConfirmResult.createConfirmed());
    }

    public decline(): void {
        this.complete(ConfirmResult.createDeclined());
    }

    private complete(result: ConfirmResult): void {
        this.dialogRef.close(result);
    }
}
