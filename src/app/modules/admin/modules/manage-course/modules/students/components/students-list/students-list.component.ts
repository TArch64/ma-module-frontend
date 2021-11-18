import { Component, forwardRef } from '@angular/core';
import { combineLatest } from 'rxjs';
import { PENDING_INVITATION_SERVICE } from '../../../common';
import { StudentPendingInvitationService } from '../../services';
import { ManageStudentsFacade } from '../../manage-students.facade';

@Component({
    selector: 'app-students-list',
    templateUrl: './students-list.component.html',
    styleUrls: ['./students-list.component.css'],
    providers: [
        {
            provide: PENDING_INVITATION_SERVICE,
            useExisting: forwardRef(() => StudentPendingInvitationService)
        }
    ]
})
export class StudentsListComponent {
    public readonly state$ = combineLatest({
        students: this.facade.students$,
        pendingInvitations: this.facade.pendingInvitations$
    });

    constructor(private readonly facade: ManageStudentsFacade) {}
}
