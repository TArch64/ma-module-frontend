import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvitationSync } from '../sync';
import { Invitation } from '../entities';

@Injectable({ providedIn: 'root' })
export class InvitationService {
    public invitation!: Invitation;

    constructor(
        private readonly sync: InvitationSync
    ) {}

    public loadInfo(invitationId: string): Observable<Invitation> {
        return this.sync.loadInvitation(invitationId).pipe(
            map(Invitation.fromJSON),
            tap((invitation: Invitation): void => {
                this.invitation = invitation;
            })
        );
    }
}
