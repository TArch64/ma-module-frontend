import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { Student } from '@common/course';
import { ManageCourseService } from '../../../services';
import { ManageStudentsSync } from '../sync';

@Injectable({ providedIn: 'root' })
export class ManageStudentsService {
    public studentsSnapshot: Student[] = [];
    public readonly students$ = this.manageCourseService.course$.pipe(
        map((course): Student[] => course?.students || []),
        tap((students) => void (this.studentsSnapshot = students))
    );

    constructor(
        private readonly manageCourseService: ManageCourseService,
        private readonly syncService: ManageStudentsSync
    ) {}

    public addStudents(emails: string[]): Observable<null> {
        const courseId = this.manageCourseService.courseSnapshot!.id;
        return this.syncService.addStudents(courseId, emails).pipe(
            map((students): Student[] => students.map(Student.fromJSON)),
            tap((students: Student[]): void => {
                this.manageCourseService.updateCourseStudents([
                    ...students,
                    ...this.studentsSnapshot
                ]);
            }),
            mapTo(null)
        );
    }
}
