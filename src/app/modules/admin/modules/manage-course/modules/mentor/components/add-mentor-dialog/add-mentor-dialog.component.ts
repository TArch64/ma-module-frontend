import {Component, OnDestroy} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "@common/toastr";
import {ManageMentorsFacade} from "../../manage-mentors.facade";
import {requireField} from "@common/form";
import {Disposable} from "@common/core";
import {throttleTime} from "rxjs/operators";
import {asyncScheduler} from "rxjs";

@Component({
    selector: 'app-add-mentor-dialog',
    templateUrl: './add-mentor-dialog.component.html',
    styleUrls: ['./add-mentor-dialog.component.css']
})
export class AddMentorDialogComponent implements OnDestroy {
    public isAdding: boolean = false;
    public readonly mentorForm = this.formBuilder.group({
        username: ['', requireField()]
    })
    public readonly mentors$ = this.facade.mentorsSearch$;
    private readonly disposable = new Disposable()

    constructor(
        private readonly dialogRef: MatDialogRef<AddMentorDialogComponent>,
        private readonly formBuilder: FormBuilder,
        private readonly facade: ManageMentorsFacade,
        private readonly toastr: ToastrService
    ) {
        this.attachSearchListener();
    }

    public ngOnDestroy() {
        this.disposable.dispose();
    }

    private attachSearchListener(): void {
        const usernameChange$ = this.mentorForm.valueChanges.pipe(
            throttleTime(500, asyncScheduler, { leading: true, trailing: true })
        );
        this.disposable.subscribeTo(usernameChange$, (form) => {
            this.facade.searchMentors(form.username).subscribe();
        });
    }

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
