import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Course, ICourseJSON} from "@common/course";
import {ManageCourseSync} from "../sync";
import {map, tap} from "rxjs/operators";

@Injectable()
export class CourseService {
    public courseSnapshot: Course | null = null;

    constructor(private readonly syncService: ManageCourseSync) {}

    public loadCourse(courseId: number): Observable<Course | null> {
        return this.syncService.loadCourse(courseId).pipe(
            map((course: ICourseJSON | null) => {
                return course ? Course.fromJSON(course) : null;
            }),
            tap(course => this.courseSnapshot = course)
        );
    }
}
