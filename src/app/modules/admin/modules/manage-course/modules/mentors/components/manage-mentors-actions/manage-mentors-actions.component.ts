import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMentorDialogComponent } from '../add-mentor-dialog';

@Component({
    selector: 'app-manage-mentors-actions',
    templateUrl: './manage-mentors-actions.component.html'
})
export class ManageMentorsActionsComponent {
    constructor(
        private readonly matDialog: MatDialog
    ) {}

    public addMentor(): void {
        this.matDialog.open(AddMentorDialogComponent, AddMentorDialogComponent.DIALOG_CONFIG);
    }
}
