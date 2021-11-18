import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPathService } from '@common/core';
import { HttpClient } from '@angular/common/http';
import { PendingInvitation } from '../../../entities';

@Injectable({ providedIn: 'root' })
export class ManageInvitationsSync {
    constructor(
        private readonly apiPath: ApiPathService,
        private readonly httpClient: HttpClient
    ) {}

    public revokeInvitation(invitation: PendingInvitation): Observable<object> {
        const url = this.apiPath.buildRolePath(['invitations', invitation.id]);
        return this.httpClient.delete<object>(url);
    }

    public resendInvitation(invitation: PendingInvitation): Observable<object> {
        const url = this.apiPath.buildRolePath(['invitations', invitation.id, 'resend']);
        return this.httpClient.post<object>(url, null);
    }
}
