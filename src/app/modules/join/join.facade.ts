import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvitationService } from './services';
import { Invitation, RegisterInfo } from './entities';

@Injectable({ providedIn: 'root' })
export class JoinFacade {
    constructor(private readonly invitationService: InvitationService) {}

    public loadInvitation(invitationId: string): Observable<Invitation> {
        return this.invitationService.loadInvitation(invitationId);
    }

    public get invitation(): Invitation {
        return this.invitationService.invitation;
    }

    public acceptInvitation(registerInfo: RegisterInfo): Observable<null> {
        return this.invitationService.acceptInvitation(registerInfo);
    }
}
