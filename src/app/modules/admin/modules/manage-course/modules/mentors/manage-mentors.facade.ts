import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Mentor } from '@common/course';
import { map } from 'rxjs/operators';
import { ManageMentorsService, MentorPendingInvitationService } from './services';

@Injectable()
export class ManageMentorsFacade {
    public readonly mentors$ = this.mentorsService.mentors$;
    public readonly leadMentor$ = this.mentorsService.leadMentor$;
    public readonly regularMentors$ = this.mentorsService.regularMentors$;
    public readonly pendingInvitations$ = this.pendingInvitationsService.invitations$;

    public readonly hasMentors$ = combineLatest({
        mentors: this.mentors$,
        invitations: this.pendingInvitations$
    }).pipe(
        map(({ mentors, invitations }): boolean => {
            return !!mentors.length || !!invitations.length;
        })
    );

    constructor(
        private readonly mentorsService: ManageMentorsService,
        private readonly pendingInvitationsService: MentorPendingInvitationService
    ) {}

    public changeLeadMentor(mentor: Mentor): Observable<null> {
        return this.mentorsService.changeLeadMentor(mentor);
    }

    public addMentors(emails: string[]): Observable<null> {
        return this.mentorsService.addMentors(emails);
    }

    public removeMentorFromCourse(mentor: Mentor): Observable<null> {
        return this.mentorsService.removeFromCourse(mentor);
    }
}
