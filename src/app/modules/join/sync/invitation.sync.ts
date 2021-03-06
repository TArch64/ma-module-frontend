import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiPathService } from '@common/core';
import { IInvitationJSON, RegisterInfo } from '../entities';

@Injectable({ providedIn: 'root' })
export class InvitationSync {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiPath: ApiPathService
    ) {}

    public loadInvitation(invitationId: string): Observable<IInvitationJSON> {
        const url = this.apiPath.build(['invitations', invitationId, 'all']);
        return this.httpClient.get<IInvitationJSON>(url);
    }

    public acceptInvitation(invitationId: string, registerInfo: RegisterInfo): Observable<object> {
        const url = this.apiPath.build(['invitations', invitationId, 'accept']);
        return this.httpClient.post<object>(url, registerInfo.toJSON());
    }
}
