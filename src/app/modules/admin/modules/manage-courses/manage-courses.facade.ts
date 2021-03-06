import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Course, CoursesRepositoryService } from '@common/course';
import { CommonSeasonsService } from '@common/season';
import { captureExistsValues } from '@common/core';
import { IAddCourseOptions } from './entities';
import { ManageCoursesService } from './services';

@Injectable({ providedIn: 'root' })
export class ManageCoursesFacade {
    public readonly courses$ = this.repository.courses$;

    public readonly currentSeasonChange$ = this.seasonsService.currentSeason$.pipe(
        captureExistsValues,
        skip(1)
    );

    constructor(
        private readonly manageCoursesService: ManageCoursesService,
        private readonly seasonsService: CommonSeasonsService,
        private readonly repository: CoursesRepositoryService
    ) {}

    public loadState(): Observable<null> {
        return this.repository.loadCourses();
    }

    public addCourse(options: IAddCourseOptions): Observable<Course> {
        return this.manageCoursesService.addCourse(options);
    }

    public removeCourse(course: Course): Observable<null> {
        return this.manageCoursesService.removeCourse(course);
    }
}

