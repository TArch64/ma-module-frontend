import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { requireEmail, requireField } from '@common/form';
import { ToastrService } from '@common/toastr';
import { Router } from '@angular/router';
import { AuthFacade } from '../../auth.facade';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
    public isProcessing: boolean = false;
    public readonly loginForm = this.formBuilder.group({
        email: [
            '',
            [requireField(), requireEmail()]
        ],
        password: ['', requireField()]
    })

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly authFacade: AuthFacade,
        private readonly toastr: ToastrService,
        private readonly router: Router
    ) {}

    public signIn(): void {
        this.loginForm.markAllAsTouched();
        if (this.loginForm.invalid) return;

        this.isProcessing = true;
        const { email, password } = this.loginForm.value;

        this.authFacade.signIn(email, password).subscribe({
            next: this.onSignedIn.bind(this),
            error: this.onSignInError.bind(this)
        });
    }

    private onSignedIn(): void {
        this.isProcessing = false;
        this.router.navigate(['/']);
    }

    private onSignInError(error: Error): void {
        this.isProcessing = false;
        this.toastr.show(error.message);
        this.loginForm.reset();
    }
}
