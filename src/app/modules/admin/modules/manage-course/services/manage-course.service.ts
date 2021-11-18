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
        this.updateCourseMentors([...mentors, ...this.courseSnapshot!.mentors]);
    }

    public removeMentorFromCourse(mentor: Mentor): void {
        const mentors = this.courseSnapshot!.mentors.filter((m): boolean => m.id !== mentor.id);
        this.updateCourseMentors(mentors);
    }

    public updateMentorInvitations(invitations: PendingInvitation[]): void {
        this.courseSubject.next(this.courseSnapshot!.clone({ pendingMentorInvitations: invitations }));
    }

    public removeMentorInvitation(invitation: PendingInvitation): void {
        const invitations = this.courseSnapshot!.pendingMentorInvitations.filter((i) => i.id !== invitation.id);
        this.updateMentorInvitations(invitations);
    }

    public addMentorInvitations(invitations: PendingInvitation[]): void {
        this.updateMentorInvitations([...invitations, ...this.courseSnapshot!.pendingMentorInvitations]);
    }

    public updateCourseStudents(students: Student[]): void {
        this.courseSubject.next(this.courseSnapshot!.clone({ students }));
    }

    public addCourseStudents(students: Student[]): void {
        this.updateCourseStudents([...students, ...this.courseSnapshot!.students]);
    }

    public removeStudentFromCourse(student: Student): void {
        const mentors = this.courseSnapshot!.students.filter((s): boolean => s.id !== student.id);
        this.updateCourseStudents(mentors);
    }

    public updateStudentInvitations(invitations: PendingInvitation[]): void {
        this.courseSubject.next(this.courseSnapshot!.clone({ pendingStudentInvitations: invitations }));
    }

    public addStudentInvitations(invitations: PendingInvitation[]): void {
        this.updateStudentInvitations([...invitations, ...this.courseSnapshot!.pendingStudentInvitations]);
    }

    public removeStudentInvitation(invitation: PendingInvitation): void {
        const invitations = this.courseSnapshot!.pendingStudentInvitations.filter((i) => i.id !== invitation.id);
        this.updateStudentInvitations(invitations);
    }
}
