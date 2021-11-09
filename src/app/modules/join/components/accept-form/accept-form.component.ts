import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { requireField } from '@common/form';
import { JoinFacade } from '../../join.facade';

@Component({
    selector: 'app-accept-form',
    templateUrl: './accept-form.component.html',
    styleUrls: ['./accept-form.component.css']
})
export class AcceptFormComponent {
    public readonly userEmail = this.facade.invitation.email;
    public readonly acceptForm = this.formBuilder.group({
        username: ['', requireField()],
        password: ['', requireField()]
    });

    public isJoining: boolean = false;

    constructor(
        private readonly facade: JoinFacade,
        private readonly formBuilder: FormBuilder
    ) {}
}
