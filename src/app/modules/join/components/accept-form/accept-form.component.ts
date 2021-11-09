import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { requireField, requireStringMinLength, requireStringMaxLength, requireStringMask } from '@common/form';
import { JoinFacade } from '../../join.facade';

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
            requireStringMask(/^[^.].+/, 'Cannot start with dot'),
            requireStringMask(/.+[^.]$/, 'Cannot end with dot'),
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
        private readonly formBuilder: FormBuilder
    ) {}

    public accept(): void {
        this.acceptForm.markAllAsTouched();
        if (this.acceptForm.invalid) return;

        this.isJoining = true;
    }
}
