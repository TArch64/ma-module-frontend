import { Component, Inject, Input, ViewChild } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { ConfirmResult, ConfirmService } from '@common/confirm';
import { ToastrService } from '@common/toastr';
import { MatDisabledButtonDirective } from '@common/core';
import { IPendingInvitationService, PENDING_INVITATION_SERVICE } from '../../services';
import { PendingInvitation } from '../../../../entities';

@Component({
    selector: 'app-pending-course-invitation',
    templateUrl: './pending-course-invitation.component.html',
    styleUrls: ['./pending-course-invitation.component.css']
})
export class PendingCourseInvitationComponent {
    @Input()
    public invitation!: PendingInvitation;

    @ViewChild('resendButtonDisabling')
    public resendButtonDisabling!: MatDisabledButtonDirective;

    public isRevoking: boolean = false;

    constructor(
        @Inject(PENDING_INVITATION_SERVICE)
        private readonly invitationService: IPendingInvitationService,
        private readonly confirm: ConfirmService,
        private readonly toastr: ToastrService
    ) {}

    public revoke(): void {
        this.confirmRevoking().pipe(
            tap(() => this.isRevoking = true),
            switchMap(() => this.invitationService.revoke(this.invitation))
        ).subscribe({
            next: this.onRevoked.bind(this),
            error: this.onRevokeFailed.bind(this)
        });
    }

    private confirmRevoking(): Observable<ConfirmResult> {
        return this.confirm.open({
            text: 'Are you sure you want to revoke the invitation?'
        });
    }

    private onRevoked(): void {
        this.isRevoking = false;
        this.toastr.show('Successfully revoked');
    }

    private onRevokeFailed(error: Error): void {
        this.isRevoking = false;
        this.toastr.show(error.message);
    }

    public resend(): void {
        this.invitationService.resend(this.invitation).subscribe({
            next: this.onResent.bind(this),
            error: this.onResendFailed.bind(this)
        });
    }

    private onResent(): void {
        this.toastr.show('Successfully sent');
        this.resendButtonDisabling.disableForTime(10000);
    }

    private onResendFailed(error: Error): void {
        this.toastr.show(error.message);
    }
}
