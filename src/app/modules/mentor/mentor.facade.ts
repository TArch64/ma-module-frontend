import { Injectable } from '@angular/core';
import { CommonSeasonsService } from '@common/season';
import { Observable, switchMap } from 'rxjs';
import { Course } from '@common/course';
import { captureExistsValues } from '@common/core';
import { CoursesService } from './services';

@Injectable({ providedIn: 'root' })
export class MentorFacade {
    public readonly hasSeasons$ = this.seasonsService.hasSeasons$;
    public readonly currentSeason$ = this.seasonsService.currentSeason$;

    constructor(
        private readonly seasonsService: CommonSeasonsService,
        private readonly coursesService: CoursesService
    ) {}

    public loadCourses(): Observable<Course[]> {
        return this.currentSeason$.pipe(
            captureExistsValues,
            switchMap(() => this.coursesService.loadCourses())
        );
    }
}
