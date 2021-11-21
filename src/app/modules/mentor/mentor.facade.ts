import { Injectable } from '@angular/core';
import { CommonSeasonsService } from '@common/season';
import { Observable, switchMap } from 'rxjs';
import { Course } from '@common/course';
import { captureExistsValues } from '@common/core';
import { CoursesService } from './services';

@Injectable({ providedIn: 'root' })
export class MentorFacade {
    public readonly hasSeasons$ = this.seasonsService.hasSeasons$;
    public readonly courses$ = this.coursesService.courses$;

    constructor(
        private readonly seasonsService: CommonSeasonsService,
        private readonly coursesService: CoursesService
    ) {}

    public loadCourses(): Observable<Course[]> {
        return this.seasonsService.currentSeason$.pipe(
            captureExistsValues,
            switchMap(() => this.coursesService.loadCourses())
        );
    }
}
