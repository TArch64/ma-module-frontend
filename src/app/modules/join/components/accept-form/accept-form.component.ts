import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { requireField, requireStringMinLength, requireStringMaxLength, requireStringMask } from '@common/form';
import { ToastrService } from '@common/toastr';
import { Router } from '@angular/router';
import { JoinFacade } from '../../join.facade';
import { RegisterInfo } from '../../entities';

@Component({
    selector: 'app-accept-form',
    templateUrl: './accept-form.component.html',
    styleUrls: ['./accept-form.component.css']
})
export class AcceptFormComponent {
    public readonly userEmail = this.facade.invitation.email;
    public readonly courses = this.facade.invitation.courseNames;
    public readonly acceptForm = this.formBuilder.group({
        username: ['', [
            requireField(),
            requireStringMask(/^[a-z.]+$/i, 'Allowed symbols are English letters (a-z) and dot'),
            requireStringMask(/^[^.].+/, 'Cannot be started with dot'),
            requireStringMask(/.+[^.]$/, 'Cannot be ended with dot'),
            requireStringMinLength(5),
            requireStringMaxLength(20)
        ]],
        password: ['', [
            requireField(),
            requireStringMinLength(6),
            requireStringMaxLength(128)
        ]]
    });

    public isJoining: boolean = false;

    constructor(
        private readonly facade: JoinFacade,
        private readonly formBuilder: FormBuilder,
        private readonly toastr: ToastrService,
        private readonly router: Router
    ) {}

    public accept(): void {
        this.acceptForm.markAllAsTouched();
        if (this.acceptForm.invalid) return;

        this.isJoining = true;
        const registerInfo = RegisterInfo.fromJSON(this.acceptForm.value);
        this.facade.acceptInvitation(registerInfo).subscribe({
            next: this.onAccepted.bind(this),
            error: this.onAcceptFailed.bind(this)
        });
    }

    private onAccepted(): void {
        this.isJoining = false;
        this.router.navigate(['/']);
    }

    private onAcceptFailed(error: Error): void {
        this.isJoining = false;
        this.toastr.show(error.message);
    }
}
