import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {CoursesSync} from "../sync";
import {map, tap} from "rxjs/operators";
import {Course} from "@common/course";
import {CommonSeasonsService} from "@common/season";

@Injectable()
export class CoursesRepositoryService {
    private readonly coursesSubject = new BehaviorSubject<Course[]>([]);

    constructor(
        private readonly coursesSync: CoursesSync,
        private readonly seasonsService: CommonSeasonsService
    ) {}

    public loadCourses(): Observable<Course[]> {
        return this.coursesSync.loadCourses(this.seasonsService.activeSeasonSnapshot!).pipe(
            map(json => json.map(Course.fromJSON)),
            tap(courses => this.coursesSubject.next(courses))
        );
    }

    public get courses$(): Observable<Course[]> {
        return this.coursesSubject.asObservable();
    }
}
