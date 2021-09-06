import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CoursesRepositoryService} from "./services";
import {mapTo, skip} from "rxjs/operators";
import {Course} from "@common/course";
import {IAddCourseOptions} from "./entities";
import {CommonSeasonsService, Season} from "@common/season";
import {captureExistsValues} from "@common/core";

@Injectable()
export class ManageCoursesFacade {

    constructor(
        private readonly repository: CoursesRepositoryService,
        private readonly seasonsService: CommonSeasonsService
    ) {}

    public loadState(): Observable<null> {
        return this.repository.loadCourses().pipe(mapTo(null));
    }

    public get courses$(): Observable<Course[]> {
        return this.repository.courses$;
    }

    public get activeSeasonChange$(): Observable<Season> {
        return this.seasonsService.activeSeason$.pipe(captureExistsValues, skip(1))
    }

    public addCourse(options: IAddCourseOptions): Observable<Course> {
        return this.repository.addCourse(options);
    }
}

