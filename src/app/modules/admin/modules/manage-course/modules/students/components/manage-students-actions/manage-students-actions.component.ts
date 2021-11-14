import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentsDialogComponent } from '../add-students-dialog';

@Component({
    selector: 'app-manage-students-actions',
    templateUrl: './manage-students-actions.component.html'
})
export class ManageStudentsActionsComponent {
    constructor(private readonly matDialog: MatDialog) {}

    public addStudents(): void {
        this.matDialog.open(AddStudentsDialogComponent, AddStudentsDialogComponent.DIALOG_CONFIG);
    }
}
