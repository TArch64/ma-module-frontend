import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Course} from "@common/course";
import {CourseService} from "./services";

@Injectable()
export class ManageCourseFacade {
    constructor(private readonly courseService: CourseService) {}

    public loadCourse(courseId: number): Observable<Course | null> {
        return this.courseService.loadCourse(courseId);
    }
}
