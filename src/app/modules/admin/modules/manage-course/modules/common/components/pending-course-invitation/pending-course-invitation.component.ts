import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { Disposable } from '@common/core';
import { Observable, switchMap, tap } from 'rxjs';
import { ConfirmResult, ConfirmService } from '@common/confirm';
import { ToastrService } from '@common/toastr';
import { IPendingInvitationService, PENDING_INVITATION_SERVICE } from '../../services';
import { PendingInvitation } from '../../../../entities';

@Component({
    selector: 'app-pending-course-invitation',
    templateUrl: './pending-course-invitation.component.html',
    styleUrls: ['./pending-course-invitation.component.css']
})
export class PendingCourseInvitationComponent implements OnDestroy {
    private readonly disposable = new Disposable();

    @Input()
    public invitation!: PendingInvitation;

    public isRevoking: boolean = false;

    constructor(
        @Inject(PENDING_INVITATION_SERVICE)
        private readonly invitationService: IPendingInvitationService,
        private readonly confirm: ConfirmService,
        private readonly toastr: ToastrService
    ) {}

    public ngOnDestroy(): void {
        this.disposable.dispose();
    }

    public revoke(): void {
        const revoking = this.confirmRevoking().pipe(
            tap(() => this.isRevoking = true),
            switchMap(() => this.invitationService.revoke(this.invitation))
        );
        this.disposable.subscribeTo(revoking, {
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
}
