import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PendingInvitation } from '../../../entities';

export const PENDING_INVITATION_SERVICE = new InjectionToken('PENDING_INVITATION_SERVICE');

export interface IPendingInvitationService {
    revoke(invitation: PendingInvitation): Observable<null>;
    resend(invitation: PendingInvitation): Observable<null>;
}
