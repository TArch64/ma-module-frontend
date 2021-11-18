import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicToolbarService } from '../../../../services';
import { ManageStudentsActionsComponent } from '../manage-students-actions';
import { ManageStudentsFacade } from '../../manage-students.facade';
import { AddStudentsDialogComponent } from '../add-students-dialog';

@Component({
    selector: 'app-manage-students-page',
    templateUrl: './manage-students-page.component.html'
})
export class ManageStudentsPageComponent {
    public readonly hasStudents$ = this.manageStudentsFacade.hasStudents$;

    constructor(
        private readonly manageStudentsFacade: ManageStudentsFacade,
        private readonly dynamicToolbarService: DynamicToolbarService,
        private readonly injector: Injector,
        private readonly matDialog: MatDialog
    ) {
        this.dynamicToolbarService.useToolbar(ManageStudentsActionsComponent, this.injector);
    }

    public addStudents(): void {
        this.matDialog.open(AddStudentsDialogComponent, AddStudentsDialogComponent.DIALOG_CONFIG);
    }
}
