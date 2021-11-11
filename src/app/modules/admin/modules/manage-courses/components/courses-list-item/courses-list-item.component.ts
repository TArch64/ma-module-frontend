import { Component, Input } from '@angular/core';
import { Course } from '@common/course';
import { Observable, switchMap, tap } from 'rxjs';
import { ConfirmResult, ConfirmService } from '@common/confirm';
import { ToastrService } from '@common/toastr';
import { ManageCoursesFacade } from '../../manage-courses.facade';

@Component({
    selector: 'app-courses-list-item',
    templateUrl: './courses-list-item.component.html',
    styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent {
    @Input()
    public course!: Course;

    public isRemoving: boolean = false;

    constructor(
        private readonly facade: ManageCoursesFacade,
        private readonly confirm: ConfirmService,
        private readonly toastr: ToastrService
    ) {}

    public removeCourse(): void {
        this.confirmRemovingSeason().pipe(
            tap(() => this.isRemoving = true),
            switchMap(() => this.facade.removeCourse(this.course))
        ).subscribe({
            next: this.onDeleted.bind(this),
            error: this.onDeleteFailed.bind(this)
        });
    }

    private confirmRemovingSeason(): Observable<ConfirmResult> {
        return this.confirm.open({
            text: 'Are you sure you want to remove the course?'
        });
    }

    private onDeleted(): void {
        this.isRemoving = false;
        this.toastr.show('Course successfully removed');
    }

    private onDeleteFailed(error: Error): void {
        this.isRemoving = false;
        this.toastr.show(error.message);
    }
}
