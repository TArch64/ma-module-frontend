import {Inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Course} from "@common/course";
import {CommonSeasonsService, ICommonSeasonsService} from "@common/season";
import {CoursesRepositorySync, ICoursesRepositorySync} from "../sync";

@Injectable({ providedIn: 'root' })
export class CoursesRepository {
    private readonly coursesSubject = new BehaviorSubject<Course[]>([]);
    public readonly courses$ = this.coursesSubject.asObservable();

    constructor(
        @Inject(CoursesRepositorySync)
        private readonly coursesSync: ICoursesRepositorySync,
        @Inject(CommonSeasonsService)
        private readonly seasonsService: ICommonSeasonsService
    ) {}

    public loadCourses(): Observable<Course[]> {
        const currentSeason = this.seasonsService.currentSeasonSnapshot!;
        return this.coursesSync.loadCourses(currentSeason).pipe(
            map(json => json.map(Course.fromJSON)),
            tap(courses => this.coursesSubject.next(courses))
        );
    }

    public get coursesSnapshot(): Course[] {
        return this.coursesSubject.value;
    }

    public addCourse(course: Course): void {
        this.coursesSubject.next([course, ...this.coursesSnapshot]);
    }
}
