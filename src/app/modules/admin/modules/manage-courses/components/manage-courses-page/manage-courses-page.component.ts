import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {ManageCoursesFacade} from "../../manage-courses.facade";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-manage-courses-page',
  templateUrl: './manage-courses-page.component.html',
  styleUrls: ['./manage-courses-page.component.css']
})
export class ManageCoursesPageComponent {
    public readonly hasCourses$: Observable<boolean> = this.createHasCoursesStream();

    constructor(private readonly facade: ManageCoursesFacade) {}

    private createHasCoursesStream(): Observable<boolean> {
        return this.facade.courses$.pipe(
            map(courses => !!courses.length)
        );
    }

    public addCourse(): void {
        console.log('add course');
    }
}
