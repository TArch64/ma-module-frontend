import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Course} from "@common/course";

@Injectable()
export class ManageCourseFacade {
    public loadCourse(courseId: number): Observable<Course | null> {
        return of(null);
    }
}
