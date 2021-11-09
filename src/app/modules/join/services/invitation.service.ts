import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { CommonAuthService } from '@common/auth';
import { InvitationSync } from '../sync';
import { Invitation, RegisterInfo } from '../entities';

@Injectable({ providedIn: 'root' })
export class InvitationService {
    public invitation!: Invitation;

    constructor(
        private readonly sync: InvitationSync,
        private readonly authService: CommonAuthService
    ) {}

    public loadInvitation(invitationId: string): Observable<Invitation> {
        return this.sync.loadInvitation(invitationId).pipe(
            map(Invitation.fromJSON),
            tap((invitation: Invitation): void => {
                this.invitation = invitation;
                this.invitation.id = invitationId;
            })
        );
    }

    public acceptInvitation(registerInfo: RegisterInfo): Observable<null> {
        return this.sync.acceptInvitation(this.invitation.id, registerInfo).pipe(
            switchMap(() => this.authService.signIn(this.invitation.email, registerInfo.password)),
            mapTo(null)
        );
    }
}
