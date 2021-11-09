import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Disposable } from '@common/core';
import { AddCourseDialogComponent } from '../add-course-dialog';
import { ManageCoursesFacade } from '../../manage-courses.facade';

@Component({
    selector: 'app-manage-courses-page',
    templateUrl: './manage-courses-page.component.html'
})
export class ManageCoursesPageComponent implements OnDestroy {
    private readonly disposable = new Disposable();
    public readonly hasCourses$: Observable<boolean> = this.createHasCoursesStream();

    constructor(
        private readonly facade: ManageCoursesFacade,
        private readonly matDialog: MatDialog
    ) {
        this.attachRefreshListener();
    }

    public ngOnDestroy(): void {
        this.disposable.dispose();
    }

    private createHasCoursesStream(): Observable<boolean> {
        return this.facade.courses$.pipe(
            map((courses): boolean => !!courses.length)
        );
    }

    public addCourse(): void {
        this.matDialog.open(AddCourseDialogComponent, AddCourseDialogComponent.DIALOG_CONFIG);
    }

    private attachRefreshListener(): void {
        const refresh$ = this.facade.currentSeasonChange$.pipe(
            switchMap((): Observable<null> => this.facade.loadState())
        );
        this.disposable.subscribeTo(refresh$, (): void => {});
    }
}
