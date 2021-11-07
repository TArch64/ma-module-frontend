import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-courses-empty',
    templateUrl: './courses-empty.component.html'
})
export class CoursesEmptyComponent {
    @Output()
    public readonly onAddCourse = new EventEmitter<null>();

    public addCourse(): void {
        this.onAddCourse.next(null);
    }
}
