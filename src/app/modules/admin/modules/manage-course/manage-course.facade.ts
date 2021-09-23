import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Course} from "@common/course";
import {ManageCourseService} from "./services";

@Injectable()
export class ManageCourseFacade {
    constructor(private readonly courseService: ManageCourseService) {}

    public loadCourse(courseId: string): Observable<Course | null> {
        return this.courseService.loadCourse(courseId);
    }

    public get course(): Course | null {
        return this.courseService.courseSnapshot;
    }
}
