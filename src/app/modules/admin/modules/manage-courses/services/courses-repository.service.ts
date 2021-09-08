import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {CoursesSync, AddCoursePayload} from "../sync";
import {map, tap} from "rxjs/operators";
import {Course, CourseTypes} from "@common/course";
import {CommonSeasonsService, Season} from "@common/season";
import {IAddCourseOptions} from "../entities";

@Injectable()
export class CoursesRepositoryService {
    private readonly coursesSubject = new BehaviorSubject<Course[]>([]);

    constructor(
        private readonly coursesSync: CoursesSync,
        private readonly seasonsService: CommonSeasonsService
    ) {}

    public loadCourses(): Observable<Course[]> {
        return this.coursesSync.loadCourses(this.currentSeason).pipe(
            map(json => json.map(Course.fromJSON)),
            tap(courses => this.coursesSubject.next(courses))
        );
    }

    private get currentSeason(): Season {
        return this.seasonsService.currentSeasonSnapshot!
    }

    public get courses$(): Observable<Course[]> {
        return this.coursesSubject.asObservable();
    }

    public addCourse(options: IAddCourseOptions): Observable<Course> {
        const payload: AddCoursePayload = {
            name: options.name,
            type: options.isGeneral ? CourseTypes.GENERAL : CourseTypes.ADDITIONAL
        };
        return this.coursesSync.addCourse(this.currentSeason, payload).pipe(map(Course.fromJSON));
    }
}
