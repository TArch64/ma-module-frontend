import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {requireField} from "@common/form";
import {AuthFacade} from "../../auth.facade";
import {ToastrService} from "@common/toastr";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
    public readonly loginForm = this.formBuilder.group({
        username: ['', requireField()],
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

        const {username, password} = this.loginForm.value;
        this.authFacade.signIn(username, password).subscribe({
            next: this.onSignedIn.bind(this),
            error: this.onSignInError.bind(this)
        });
    }

    private onSignedIn(): void {
        this.router.navigate(['/'])
    }

    private onSignInError(error: Error): void {
        this.toastr.show(error.message);
    }
}
