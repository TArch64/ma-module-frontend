import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Course } from '@common/course';
import { CommonSeasonsService } from '@common/season';
import { map } from 'rxjs/operators';
import { CoursesSync } from '../sync';

@Injectable({ providedIn: 'root' })
export class CoursesService {
    private readonly coursesSubject = new BehaviorSubject<Course[]>([]);
    public readonly courses$ = this.coursesSubject.asObservable();

    constructor(
        private readonly commonSeasonsService: CommonSeasonsService,
        private readonly coursesSync: CoursesSync
    ) {}

    public loadCourses(): Observable<Course[]> {
        return this.coursesSync.loadCourses(this.commonSeasonsService.currentSeasonSnapshot!).pipe(
            map((courses) => courses.map(Course.fromJSON)),
            tap((courses) => this.coursesSubject.next(courses))
        );
    }
}
