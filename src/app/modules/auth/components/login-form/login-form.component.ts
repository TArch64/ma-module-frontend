import {Component, Inject, OnDestroy} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {requireEmail, requireField} from "@common/form";
import {AuthFacade, IAuthFacade} from "../../auth.facade";
import {ToastrService} from "@common/toastr";
import {Router} from "@angular/router";
import {switchMap, tap} from "rxjs/operators";
import {EventProcessor} from "@common/core";
import {User} from "@common/auth";

interface ICredentials {
    email: string;
    password: string;
}

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnDestroy {
    public isProcessing: boolean = false;
    public readonly loginForm = this.formBuilder.group({
        email: [
            '',
            [requireField(), requireEmail()]
        ],
        password: ['', requireField()]
    });
    public loginProcessor = new EventProcessor<ICredentials, User>((source) => {
        return source.pipe(
            tap(() => this.isProcessing = true),
            switchMap(creds => this.authFacade.signIn(creds.email, creds.password)),
            tap(this.onSignedIn.bind(this)),
            tap(() => this.isProcessing = false)
        );
    });

    constructor(
        @Inject(AuthFacade)
        private readonly authFacade: IAuthFacade,
        private readonly formBuilder: FormBuilder,
        private readonly toastr: ToastrService,
        private readonly router: Router
    ) {
        this.loginProcessor.events$.subscribe({
            error: this.onSignInError.bind(this)
        });
    }

    public ngOnDestroy() {
        this.loginProcessor.destroy();
    }

    public signIn(): void {
        this.loginForm.markAllAsTouched();
        if (this.loginForm.invalid) return;

        this.loginProcessor.do(this.loginForm.value);
    }

    private onSignedIn(): void {
        this.router.navigate(['/'])
    }

    private onSignInError(error: Error): void {
        this.isProcessing = false;
        this.toastr.show(error.message);
        this.loginForm.reset();
    }
}
