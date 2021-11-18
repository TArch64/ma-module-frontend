import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Mentor, Student } from '@common/course';
import { ManageCourseSync } from '../sync';
import { FullCourse, PendingInvitation } from '../entities';

@Injectable({ providedIn: 'root' })
export class ManageCourseService {
    private readonly courseSubject = new BehaviorSubject<FullCourse | null>(null);
    public readonly course$ = this.courseSubject.asObservable();

    constructor(private readonly syncService: ManageCourseSync) {}

    public loadCourse(courseId: string): Observable<FullCourse | null> {
        return this.syncService.loadCourse(courseId).pipe(
            map((course): FullCourse | null => course ? FullCourse.fromJSON(course) : null),
            tap((course): void => this.courseSubject.next(course))
        );
    }

    public get courseSnapshot(): FullCourse | null {
        return this.courseSubject.value;
    }

    public updateCourseMentors(mentors: Mentor[]): void {
        this.courseSubject.next(this.courseSnapshot!.clone({ mentors }));
    }

    public addCourseMentors(mentors: Mentor[]): void {
        const courseMentors = [...mentors, ...this.courseSnapshot!.mentors];
        this.courseSubject.next(this.courseSnapshot!.clone({ mentors: courseMentors }));
    }

    public removeMentorInvitation(invitation: PendingInvitation): void {
        const invitations = this.courseSnapshot!.pendingMentorInvitations.filter((i) => i.id !== invitation.id);
        this.courseSubject.next(this.courseSnapshot!.clone({ pendingMentorInvitations: invitations }));
    }

    public addMentorInvitations(invitations: PendingInvitation[]): void {
        const pendingMentorInvitations = [...invitations, ...this.courseSnapshot!.pendingMentorInvitations];
        this.courseSubject.next(this.courseSnapshot!.clone({ pendingMentorInvitations }));
    }

    public updateCourseStudents(students: Student[]): void {
        this.courseSubject.next(this.courseSnapshot!.clone({ students }));
    }

    public removeStudentInvitation(invitation: PendingInvitation): void {
        const invitations = this.courseSnapshot!.pendingStudentInvitations.filter((i) => i.id !== invitation.id);
        this.courseSubject.next(this.courseSnapshot!.clone({ pendingStudentInvitations: invitations }));
    }
}
