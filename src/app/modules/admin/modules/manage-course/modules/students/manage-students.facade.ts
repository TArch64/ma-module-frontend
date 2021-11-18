import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Student } from '@common/course';
import { map } from 'rxjs/operators';
import { ManageStudentsService, StudentPendingInvitationService } from './services';

@Injectable({ providedIn: 'root' })
export class ManageStudentsFacade {
    public readonly students$ = this.manageStudentsService.students$;
    public readonly pendingInvitations$ = this.invitationService.invitations$;

    public readonly hasStudents$ = combineLatest({
        students: this.students$,
        invitations: this.pendingInvitations$
    }).pipe(
        map(({ students, invitations }): boolean => {
            return !!students.length || !!invitations.length;
        })
    );

    constructor(
        private readonly manageStudentsService: ManageStudentsService,
        private readonly invitationService: StudentPendingInvitationService
    ) {}

    public addStudents(emails: string[]): Observable<null> {
        return this.manageStudentsService.addStudents(emails);
    }

    public removeStudentFromCourse(student: Student): Observable<null> {
        return this.manageStudentsService.removeFromCourse(student);
    }
}
