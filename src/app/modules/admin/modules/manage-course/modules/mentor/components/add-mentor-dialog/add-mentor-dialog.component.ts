import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "@common/toastr";
import {ManageMentorsFacade} from "../../manage-mentors.facade";

@Component({
  selector: 'app-add-mentor-dialog',
  templateUrl: './add-mentor-dialog.component.html'
})
export class AddMentorDialogComponent {
    public isAdding: boolean = false;
    public readonly mentorForm = this.formBuilder.group({})

    constructor(
        private readonly dialogRef: MatDialogRef<AddMentorDialogComponent>,
        private readonly formBuilder: FormBuilder,
        private readonly facade: ManageMentorsFacade,
        private readonly toastr: ToastrService
    ) {}

    public addMentor(): void {
        this.isAdding = true;
        this.facade.addMentor().subscribe({
            next: this.onMentorAdded.bind(this),
            error: this.onAddFailed.bind(this)
        });
    }

    private onMentorAdded(): void {
        this.toastr.show('Mentor successfully added');
        this.dialogRef.close();
    }

    private onAddFailed(error: Error): void {
        this.toastr.show(error.message);
    }
}
