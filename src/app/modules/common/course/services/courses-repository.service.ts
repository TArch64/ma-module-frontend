import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Course } from '@common/course';
import { CommonSeasonsService } from '@common/season';
import { CoursesRepositorySync } from '../sync';

@Injectable({ providedIn: 'root' })
export class CoursesRepositoryService {
    private readonly coursesSubject = new BehaviorSubject<Course[]>([]);
    public readonly courses$ = this.coursesSubject.asObservable();

    constructor(
        private readonly coursesSync: CoursesRepositorySync,
        private readonly seasonsService: CommonSeasonsService
    ) {}

    public loadCourses(): Observable<Course[]> {
        const currentSeason = this.seasonsService.currentSeasonSnapshot!;
        return this.coursesSync.loadCourses(currentSeason).pipe(
            map((json): Course[] => json.map(Course.fromJSON)),
            tap((courses): void => this.coursesSubject.next(courses))
        );
    }

    public get coursesSnapshot(): Course[] {
        return this.coursesSubject.value;
    }

    public addCourse(course: Course): void {
        this.coursesSubject.next([course, ...this.coursesSnapshot]);
    }
}
