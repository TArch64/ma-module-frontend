import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {CoursesRepositorySync} from "../sync";
import {map, tap} from "rxjs/operators";
import {Course} from "@common/course";
import {CommonSeasonsService} from "@common/season";

@Injectable({ providedIn: 'root' })
export class CoursesRepositoryService {
    private readonly coursesSubject = new BehaviorSubject<Course[]>([]);

    constructor(
        private readonly coursesSync: CoursesRepositorySync,
        private readonly seasonsService: CommonSeasonsService
    ) {}

    public loadCourses(): Observable<Course[]> {
        const currentSeason = this.seasonsService.currentSeasonSnapshot!;
        return this.coursesSync.loadCourses(currentSeason).pipe(
            map(json => json.map(Course.fromJSON)),
            tap(courses => this.coursesSubject.next(courses))
        );
    }

    public get courses$(): Observable<Course[]> {
        return this.coursesSubject.asObservable();
    }

    public get coursesSnapshot(): Course[] {
        return this.coursesSubject.value;
    }

    public addCourse(course: Course): void {
        this.coursesSubject.next([course, ...this.coursesSnapshot]);
    }
}
