import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@common/confirm/components';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DialogSizes } from '@common/dialog';
import { ConfirmOptions, ConfirmResult, IConfirmOptions } from '../entities';
import { ConfirmModule } from '../confirm.module';

type ConfirmRef = MatDialogRef<ConfirmDialogComponent>;
type ConfirmResult$ = Observable<ConfirmResult>;


@Injectable({ providedIn: ConfirmModule })
export class ConfirmService {
    constructor(private readonly matDialog: MatDialog) {}

    public open(rawOptions: IConfirmOptions): ConfirmResult$ {
        const options = ConfirmOptions.create(rawOptions);
        const dialogRef: ConfirmRef = this.matDialog.open(ConfirmDialogComponent, {
            width: DialogSizes.XS,
            data: options
        });
        return this.onDialogClosed(dialogRef, options);
    }

    private onDialogClosed(dialogRef: ConfirmRef, options: ConfirmOptions): Observable<ConfirmResult> {
        let afterClosed$ = dialogRef.afterClosed().pipe(
            // Convert backdropClick event into dialog dismiss
            map((result?: ConfirmResult): ConfirmResult => result || ConfirmResult.createDeclined())
        );
        if (options.ignoreDismissEvent) {
            afterClosed$ = afterClosed$.pipe(filter((result): boolean => result.isConfirmed));
        }
        return afterClosed$;
    }
}
