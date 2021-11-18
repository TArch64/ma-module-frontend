import { Component, Input } from '@angular/core';
import { Student } from '@common/course';
import { ToastrService } from '@common/toastr';
import { ConfirmResult, ConfirmService } from '@common/confirm';
import { Observable, switchMap, tap } from 'rxjs';
import { ManageStudentsFacade } from '../../manage-students.facade';

@Component({
    selector: 'app-students-list-item',
    templateUrl: './students-list-item.component.html'
})
export class StudentsListItemComponent {
    @Input()
    public student!: Student;

    public isRemoving: boolean = false;

    constructor(
        private readonly facade: ManageStudentsFacade,
        private readonly confirm: ConfirmService,
        private readonly toastr: ToastrService
    ) {}

    public removeStudent(): void {
        this.confirmRemoving().pipe(
            tap(() => this.isRemoving = true),
            switchMap(() => this.facade.removeStudentFromCourse(this.student))
        ).subscribe({
            next: this.onRemoved.bind(this),
            error: this.onRemoveFailed.bind(this)
        });
    }

    private confirmRemoving(): Observable<ConfirmResult> {
        return this.confirm.open({
            text: 'Are you sure you want to remove the student from course?'
        });
    }

    public onRemoved(): void {
        this.isRemoving = false;
        this.toastr.show('Successfully removed from the course');
    }

    public onRemoveFailed(error: Error): void {
        this.isRemoving = false;
        this.toastr.show(error.message);
    }
}
