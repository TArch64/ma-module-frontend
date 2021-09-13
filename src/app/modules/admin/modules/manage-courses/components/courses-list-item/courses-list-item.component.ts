import {Component, Input} from '@angular/core';
import {Course} from "@common/course";
import {Observable} from "rxjs";
import {ConfirmResult, ConfirmService} from "@common/confirm";

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent {
    @Input()
    public course!: Course;

    constructor(private readonly confirm: ConfirmService) {}

    public removeCourse(): void {
        this.confirmRemovingSeason().subscribe();
    }

    private confirmRemovingSeason(): Observable<ConfirmResult> {
        return this.confirm.open({
            text: 'Are you sure you want to remove the course?'
        });
    }
}
