import {Component} from '@angular/core';
import {ManageCoursesFacade} from "../../manage-courses.facade";

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent {
    public readonly courses$ = this.facade.courses$;

    constructor(private readonly facade: ManageCoursesFacade) {}
}
