import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvitationService } from './services';
import { Invitation } from './entities';

@Injectable({ providedIn: 'root' })
export class JoinFacade {
    constructor(private readonly invitationService: InvitationService) {}

    public loadInfo(invitationId: string): Observable<Invitation> {
        return this.invitationService.loadInfo(invitationId);
    }

    public get invitation(): Invitation {
        return this.invitationService.invitation;
    }
}
