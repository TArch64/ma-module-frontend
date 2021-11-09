import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Course, CoursesRepositoryService, CourseTypes } from '@common/course';
import { CommonSeasonsService } from '@common/season';
import { CoursesSync, AddCoursePayload } from '../sync';
import { IAddCourseOptions } from '../entities';

@Injectable()
export class ManageCoursesService {
    constructor(
        private readonly coursesSync: CoursesSync,
        private readonly seasonsService: CommonSeasonsService,
        private readonly repository: CoursesRepositoryService
    ) {}

    public addCourse(options: IAddCourseOptions): Observable<Course> {
        const payload: AddCoursePayload = {
            name: options.name,
            type: options.isGeneral ? CourseTypes.GENERAL : CourseTypes.ADDITIONAL
        };
        const currentSeason = this.seasonsService.currentSeasonSnapshot!;
        return this.coursesSync.addCourse(currentSeason, payload).pipe(
            map(Course.fromJSON),
            tap((course): void => this.repository.addCourse(course))
        );
    }
}
