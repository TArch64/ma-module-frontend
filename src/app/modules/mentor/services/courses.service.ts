import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '@common/course';
import { CommonSeasonsService } from '@common/season';
import { CoursesSync } from '../sync';

@Injectable({ providedIn: 'root' })
export class CoursesService {
    constructor(
        private readonly commonSeasonsService: CommonSeasonsService,
        private readonly coursesSync: CoursesSync
    ) {}

    public loadCourses(): Observable<Course[]> {
        return this.coursesSync.loadCourses(this.commonSeasonsService.currentSeasonSnapshot!);
    }
}
