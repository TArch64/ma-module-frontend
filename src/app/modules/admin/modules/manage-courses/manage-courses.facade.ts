import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CoursesRepositoryService} from "./services";
import {mapTo} from "rxjs/operators";
import {Course} from "@common/course";
import {IAddCourseOptions} from "./entities";

@Injectable()
export class ManageCoursesFacade {
    constructor(private readonly repository: CoursesRepositoryService) {}

    public loadState(): Observable<null> {
        return this.repository.loadCourses().pipe(mapTo(null));
    }

    public get courses$(): Observable<Course[]> {
        return this.repository.courses$;
    }

    public addCourse(options: IAddCourseOptions): Observable<Course> {
        return this.repository.addCourse(options);
    }
}

