import {Component, OnDestroy} from '@angular/core';
import {Observable} from "rxjs";
import {ManageCoursesFacade} from "../../manage-courses.facade";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {AddCourseDialogComponent} from "../add-course-dialog";
import {DialogSizes} from "@common/dialog";
import {Disposable} from "@common/core";

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

    ngOnDestroy() {
        this.disposable.dispose();
    }

    private createHasCoursesStream(): Observable<boolean> {
        return this.facade.courses$.pipe(
            map(courses => !!courses.length)
        );
    }

    public addCourse(): void {
        this.matDialog.open(AddCourseDialogComponent, {width: DialogSizes.MD});
    }

    private attachRefreshListener(): void {
        this.disposable.subscribeTo(this.facade.activeSeasonChange$, () => this.facade.loadState().subscribe())
    }
}
