import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Mentor } from '@common/course';
import { ManageCourseSync } from '../sync';
import { FullCourse } from '../entities';

@Injectable()
export class ManageCourseService {
    private readonly courseSubject = new BehaviorSubject<FullCourse | null>(null);
    public readonly course$ = this.courseSubject.asObservable();

    constructor(private readonly syncService: ManageCourseSync) {}

    public loadCourse(courseId: string): Observable<FullCourse | null> {
        return this.syncService.loadCourse(courseId).pipe(
            map((course) => course ? FullCourse.fromJSON(course) : null),
            tap((course) => this.courseSubject.next(course))
        );
    }

    public get courseSnapshot(): FullCourse | null {
        return this.courseSubject.value;
    }

    public updateCourseMentors(mentors: Mentor[]): void {
        this.courseSubject.next(this.courseSnapshot!.clone({ mentors }));
    }
}
