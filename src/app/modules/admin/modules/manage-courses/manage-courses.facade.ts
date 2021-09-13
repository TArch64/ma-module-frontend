import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ManageCoursesService} from "./services";
import {mapTo, skip} from "rxjs/operators";
import {Course, CoursesRepositoryService} from "@common/course";
import {IAddCourseOptions} from "./entities";
import {CommonSeasonsService, Season} from "@common/season";
import {captureExistsValues} from "@common/core";

@Injectable()
export class ManageCoursesFacade {
    constructor(
        private readonly manageCoursesService: ManageCoursesService,
        private readonly seasonsService: CommonSeasonsService,
        private readonly repository: CoursesRepositoryService
    ) {}

    public loadState(): Observable<null> {
        return this.repository.loadCourses().pipe(mapTo(null));
    }

    public get courses$(): Observable<Course[]> {
        return this.repository.courses$;
    }

    public get currentSeasonChange$(): Observable<Season> {
        return this.seasonsService.currentSeason$.pipe(captureExistsValues, skip(1))
    }

    public addCourse(options: IAddCourseOptions): Observable<Course> {
        return this.manageCoursesService.addCourse(options);
    }
}

