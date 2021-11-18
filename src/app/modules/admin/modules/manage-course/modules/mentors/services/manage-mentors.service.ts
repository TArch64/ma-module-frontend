import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { Mentor, MentorRoles } from '@common/course';
import { ManageCourseService } from '../../../services';
import { ManageMentorsSync } from '../sync';
import { PendingInvitation } from '../../../entities';

@Injectable()
export class ManageMentorsService {
    public mentorsSnapshot: Mentor[] = [];
    public readonly mentors$ = this.manageCourseService.course$.pipe(
        map((course): Mentor[] => course?.mentors || []),
        tap((mentors) => void (this.mentorsSnapshot = mentors))
    );

    public leadMentorSnapshot: Mentor | null = null;
    public readonly leadMentor$: Observable<Mentor | null> = this.mentors$.pipe(
        map((mentors): Mentor | null => {
            return mentors.find((mentor): boolean => mentor.isLead) ?? null;
        }),
        tap((mentor) => void (this.leadMentorSnapshot = mentor))
    );

    public readonly regularMentors$ = this.mentors$.pipe(
        map((mentors): Mentor[] => {
            return mentors.filter((mentor): boolean => mentor.isRegular);
        })
    );

    constructor(
        private readonly manageCourseService: ManageCourseService,
        private readonly syncService: ManageMentorsSync
    ) {}

    public changeLeadMentor(mentor: Mentor): Observable<null> {
        const courseId = this.manageCourseService.courseSnapshot!.id;
        return this.syncService.changeLeadMentor(courseId, mentor.id).pipe(
            tap((): void => {
                const mentors = this.mentorsSnapshot.slice();
                if (this.leadMentorSnapshot) {
                    const oldLead = this.leadMentorSnapshot.clone({ role: MentorRoles.MENTOR });
                    this.updateMentor(mentors, oldLead);
                }
                this.updateMentor(mentors, mentor.clone({ role: MentorRoles.LEAD }));
                this.manageCourseService.updateCourseMentors(mentors);
            }),
            mapTo(null)
        );
    }

    private updateMentor(mentors: Mentor[], mentor: Mentor): void {
        const index = mentors.findIndex((m): boolean => m.id === mentor.id);
        mentors.splice(index, 1, mentor);
    }

    public addMentors(emails: string[]): Observable<null> {
        const courseId = this.manageCourseService.courseSnapshot!.id;
        return this.syncService.addMentors(courseId, emails).pipe(
            tap(({ mentors, invitations }): void => {
                this.manageCourseService.addCourseMentors(mentors.map(Mentor.fromJSON));
                this.manageCourseService.addMentorInvitations(invitations.map(PendingInvitation.fromJSON));
            }),
            mapTo(null)
        );
    }

    public removeFromCourse(mentor: Mentor): Observable<null> {
        return this.syncService.removeFromCourse(mentor).pipe(
            tap(() => {
                const mentors = this.mentorsSnapshot.filter((m): boolean => m.id !== mentor.id);
                this.manageCourseService.updateCourseMentors(mentors);
            }),
            mapTo(null)
        );
    }
}
