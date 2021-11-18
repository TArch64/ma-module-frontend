import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { IPendingInvitationService } from '../../common';
import { PendingInvitation } from '../../../entities';
import { ManageCourseService } from '../../../services';
import { ManageInvitationsSync } from '../../common/sync';

@Injectable({ providedIn: 'root' })
export class MentorPendingInvitationService implements IPendingInvitationService {
    public invitationsSnapshot: PendingInvitation[] = [];
    public invitations$: Observable<PendingInvitation[]> = this.manageCourseService.course$.pipe(
        map((course): PendingInvitation[] => course?.pendingMentorInvitations || []),
        tap((invitations) => void (this.invitationsSnapshot = invitations))
    );

    constructor(
        private readonly manageCourseService: ManageCourseService,
        private readonly syncService: ManageInvitationsSync
    ) {}

    public revoke(invitation: PendingInvitation): Observable<null> {
        return this.syncService.revokeInvitation(invitation).pipe(
            tap(() => this.manageCourseService.removeMentorInvitation(invitation)),
            mapTo(null)
        );
    }

    public resend(invitation: PendingInvitation): Observable<null> {
        return this.syncService.resendInvitation(invitation).pipe(mapTo(null));
    }
}
