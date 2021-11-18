import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { Student } from '@common/course';
import { ManageCourseService } from '../../../services';
import { ManageStudentsSync } from '../sync';
import { PendingInvitation } from '../../../entities';

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
            tap(({ students, invitations }): void => {
                this.manageCourseService.addCourseStudents(students.map(Student.fromJSON));
                this.manageCourseService.addStudentInvitations(invitations.map(PendingInvitation.fromJSON));
            }),
            mapTo(null)
        );
    }

    public removeFromCourse(student: Student): Observable<null> {
        return this.syncService.removeFromCourse(student).pipe(
            tap(() => this.manageCourseService.removeStudentFromCourse(student)),
            mapTo(null)
        );
    }
}
