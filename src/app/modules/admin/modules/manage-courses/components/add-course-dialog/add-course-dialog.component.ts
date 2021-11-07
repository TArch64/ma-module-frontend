import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { requireField } from '@common/form';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from '@common/toastr';
import { DialogSizes } from '@common/dialog';
import { ManageCoursesFacade } from '../../manage-courses.facade';

@Component({
    selector: 'app-add-course-dialog',
    templateUrl: './add-course-dialog.component.html'
})
export class AddCourseDialogComponent {
    public static readonly DIALOG_CONFIG: MatDialogConfig = {
        width: DialogSizes.MD
    };

    public isAdding: boolean = false;
    public readonly courseForm = this.formBuilder.group({
        name: ['', requireField()],
        isGeneral: [true]
    });

    constructor(
        private readonly dialogRef: MatDialogRef<AddCourseDialogComponent>,
        private readonly formBuilder: FormBuilder,
        private readonly facade: ManageCoursesFacade,
        private readonly toastr: ToastrService
    ) {}

    public addCourse(): void {
        this.isAdding = true;
        this.facade.addCourse(this.courseForm.value).subscribe({
            next: this.onCourseAdded.bind(this),
            error: this.onAddFailed.bind(this)
        });
    }

    private onCourseAdded(): void {
        this.toastr.show('Course successfully added');
        this.dialogRef.close();
    }

    private onAddFailed(error: Error): void {
        this.toastr.show(error.message);
    }
}
