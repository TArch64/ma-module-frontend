import { Component } from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from '@common/toastr';
import { requireArrayMinLength } from '@common/form';
import { DialogSizes } from '@common/dialog';
import { ManageStudentsFacade } from '../../manage-students.facade';
import { UserInputData, USERS_AUTOCOMPLETE_SERVICE } from '../../../common';
import { StudentsAutocompleteService } from '../../services';

@Component({
    selector: 'app-add-students-dialog',
    templateUrl: './add-students-dialog.component.html',
    providers: [
        {
            provide: USERS_AUTOCOMPLETE_SERVICE,
            useClass: StudentsAutocompleteService
        }
    ]
})
export class AddStudentsDialogComponent {
    public static readonly DIALOG_CONFIG: MatDialogConfig = {
        width: DialogSizes.MD
    };

    public isAdding: boolean = false;
    public readonly studentsForm = this.formBuilder.group({
        users: [[], requireArrayMinLength(1, 'Add at list one student')]
    });

    constructor(
        private readonly dialogRef: MatDialogRef<AddStudentsDialogComponent>,
        private readonly formBuilder: FormBuilder,
        private readonly facade: ManageStudentsFacade,
        private readonly toastr: ToastrService
    ) {}

    public get isAddDisabled(): boolean {
        return !this.studentsForm.value.users.length;
    }

    public addStudents(): void {
        this.studentsForm.markAllAsTouched();
        if (this.studentsForm.invalid) return;

        this.isAdding = true;
        const emails = this.studentsForm.value.users.map((user: UserInputData): string => user.email);

        this.facade.addStudents(emails).subscribe({
            next: this.onStudentsAdded.bind(this),
            error: this.onAddFailed.bind(this)
        });
    }

    private onStudentsAdded(): void {
        this.toastr.show('Students successfully added');
        this.dialogRef.close();
    }

    private onAddFailed(error: Error): void {
        this.isAdding = false;
        this.toastr.show(error.message);
    }
}
