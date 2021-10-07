import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "@common/toastr";
import {ManageMentorsFacade} from "../../manage-mentors.facade";
import {UserInputData, USERS_AUTOCOMPLETE_SERVICE} from "../../../common";
import {MentorsAutocompleteService} from "../../services";
import {requireArrayLength} from "@common/form";

@Component({
    selector: 'app-add-mentor-dialog',
    templateUrl: './add-mentor-dialog.component.html',
    styleUrls: ['./add-mentor-dialog.component.css'],
    providers: [
        {
            provide: USERS_AUTOCOMPLETE_SERVICE,
            useClass: MentorsAutocompleteService
        }
    ]
})
export class AddMentorDialogComponent {
    public isAdding: boolean = false;
    public readonly mentorsForm = this.formBuilder.group({
        users: [[], requireArrayLength(1, 'Add at list one mentor')]
    });

    constructor(
        private readonly dialogRef: MatDialogRef<AddMentorDialogComponent>,
        private readonly formBuilder: FormBuilder,
        private readonly facade: ManageMentorsFacade,
        private readonly toastr: ToastrService
    ) {}

    public get isAddDisabled(): boolean {
        return !this.mentorsForm.value.users.length;
    }

    public addMentor(): void {
        this.mentorsForm.markAllAsTouched();
        if (this.mentorsForm.invalid) return;

        this.isAdding = true;
        this.mentorsForm.disable();
        const emails = this.mentorsForm.value.users.map((user: UserInputData) => user.email);

        this.facade.addMentors(emails).subscribe({
            next: this.onMentorAdded.bind(this),
            error: this.onAddFailed.bind(this)
        });
    }

    private onMentorAdded(): void {
        this.toastr.show('Mentor successfully added');
        this.dialogRef.close();
    }

    private onAddFailed(error: Error): void {
        this.isAdding = false;
        this.mentorsForm.enable();
        this.toastr.show(error.message);
    }
}
