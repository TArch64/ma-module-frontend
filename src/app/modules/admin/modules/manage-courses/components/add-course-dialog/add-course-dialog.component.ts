import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {requireField} from "@common/form";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.css']
})
export class AddCourseDialogComponent {
    public isAdding: boolean = false;
    public readonly courseForm = this.formBuilder.group({
        name: ['', requireField()],
        isGeneral: [true]
    })

    constructor(
        private readonly dialogRef: MatDialogRef<AddCourseDialogComponent>,
        private readonly formBuilder: FormBuilder
    ) {}

    public addCourse(): void {
        this.isAdding = true;
        setTimeout(() => this.dialogRef.close(), 3000);
    }
}
