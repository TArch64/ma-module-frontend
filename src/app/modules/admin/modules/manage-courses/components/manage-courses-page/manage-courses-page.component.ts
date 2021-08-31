import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {ManageCoursesFacade} from "../../manage-courses.facade";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {AddCourseDialogComponent} from "../add-course-dialog";
import {DialogSizes} from "@common/dialog";

@Component({
  selector: 'app-manage-courses-page',
  templateUrl: './manage-courses-page.component.html',
  styleUrls: ['./manage-courses-page.component.css']
})
export class ManageCoursesPageComponent {
    public readonly hasCourses$: Observable<boolean> = this.createHasCoursesStream();

    constructor(
        private readonly facade: ManageCoursesFacade,
        private readonly matDialog: MatDialog
    ) {}

    private createHasCoursesStream(): Observable<boolean> {
        return this.facade.courses$.pipe(
            map(courses => !!courses.length)
        );
    }

    public addCourse(): void {
        this.matDialog.open(AddCourseDialogComponent, {width: DialogSizes.MD});
    }
}
