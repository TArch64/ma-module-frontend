import { Component, Input } from '@angular/core';
import { Mentor } from '@common/course';
import { ToastrService } from '@common/toastr';
import { ConfirmResult, ConfirmService } from '@common/confirm';
import { Observable, switchMap, tap } from 'rxjs';
import { ManageMentorsFacade } from '../../manage-mentors.facade';

@Component({
    selector: 'app-mentors-list-item',
    templateUrl: './mentors-list-item.component.html'
})
export class MentorsListItemComponent {
    @Input()
    public mentor!: Mentor;

    public isRemoving: boolean = false;

    constructor(
        private readonly facade: ManageMentorsFacade,
        private readonly confirm: ConfirmService,
        private readonly toastr: ToastrService
    ) {}

    public removeMentor(): void {
        this.confirmRemoving().pipe(
            tap(() => this.isRemoving = true),
            switchMap(() => this.facade.removeMentorFromCourse(this.mentor))
        ).subscribe({
            next: this.onRemoved.bind(this),
            error: this.onRemoveFailed.bind(this)
        });
    }

    private confirmRemoving(): Observable<ConfirmResult> {
        return this.confirm.open({
            text: 'Are you sure you want to remove the course?'
        });
    }

    public onRemoved(): void {
        this.isRemoving = false;
        this.toastr.show('Mentor successfully removed from course');
    }

    public onRemoveFailed(error: Error): void {
        this.isRemoving = false;
        this.toastr.show(error.message);
    }
}
