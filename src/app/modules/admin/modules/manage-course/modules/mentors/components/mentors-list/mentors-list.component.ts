import { Component, forwardRef } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ManageMentorsFacade } from '../../manage-mentors.facade';
import { PENDING_INVITATION_SERVICE } from '../../../common';
import { MentorPendingInvitationService } from '../../services';

@Component({
    selector: 'app-mentors-list',
    templateUrl: './mentors-list.component.html',
    styleUrls: ['./mentors-list.component.css'],
    providers: [
        {
            provide: PENDING_INVITATION_SERVICE,
            useExisting: forwardRef(() => MentorPendingInvitationService)
        }
    ]
})
export class MentorsListComponent {
    public readonly state$ = combineLatest({
        leadMentor: this.facade.leadMentor$,
        mentors: this.facade.regularMentors$,
        pendingInvitations: this.facade.pendingInvitations$
    });

    constructor(private readonly facade: ManageMentorsFacade) {}
}
