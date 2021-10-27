import {Observable, of} from "rxjs";
import {By} from "@angular/platform-browser";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormControlName, FormGroupDirective, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatLoadingButtonDirective} from "@common/core";
import {IToastrService, ToastrService} from "@common/toastr";
import {User, UserRoles} from "@common/auth";
import {AuthFacade, IAuthFacade} from "../../auth.facade";
import {LoginFormComponent} from "./login-form.component";
import {first} from "rxjs/operators";

class MockAuthFacade implements IAuthFacade {
    static create(): MockAuthFacade {
        return new MockAuthFacade();
    }

    readonly mockSignIn = jest.spyOn<IAuthFacade, 'signIn'>(this, 'signIn');

    signIn(email: string, password: string): Observable<User> {
        return of(User.fromJSON({
            id: 'test',
            role: UserRoles.ADMIN,
            username: 'test'
        }));
    }
}

class MockToastrService implements IToastrService {
    static create(): MockToastrService {
        return new MockToastrService();
    }

    show(text: string) {}
}

function createComponent(facade: IAuthFacade): ComponentFixture<LoginFormComponent> {
    const module = TestBed.configureTestingModule({
        imports: [
            NoopAnimationsModule,
            RouterTestingModule,
            ReactiveFormsModule,
            MatCardModule,
            MatButtonModule,
            MatFormFieldModule,
            MatInputModule
        ],
        providers: [
            {provide: AuthFacade, useValue: facade},
            {provide: ToastrService, useValue: MockToastrService.create()}
        ],
        declarations: [LoginFormComponent, MatLoadingButtonDirective]
    });
    return module.createComponent(LoginFormComponent);
}

describe('login', () => {
    test('should not login if email invalid', () => {
        const facade = MockAuthFacade.create();
        const fixture = createComponent(facade);
        fixture.detectChanges();

        const emailInput = fixture.debugElement.query(By.css('[formControlName="email"]'));
        const emailControl = emailInput.injector.get(FormControlName).control;

        emailControl.setValue('test');
        fixture.detectChanges();

        const form = fixture.debugElement.query(By.directive(FormGroupDirective));
        form.triggerEventHandler('submit', null);

        expect(facade.mockSignIn).not.toHaveBeenCalled();
    });

    test('should not login if password invalid', () => {
        const facade = MockAuthFacade.create();
        const fixture = createComponent(facade);
        fixture.detectChanges();

        const passwordInput = fixture.debugElement.query(By.css('[formControlName="password"]'));
        const passwordControl = passwordInput.injector.get(FormControlName).control;

        passwordControl.setValue('');
        fixture.detectChanges();

        const form = fixture.debugElement.query(By.directive(FormGroupDirective));
        form.triggerEventHandler('submit', null);

        expect(facade.mockSignIn).not.toHaveBeenCalled();
    });

    test('should login', async () => {
        const facade = MockAuthFacade.create();
        const fixture = createComponent(facade);
        fixture.detectChanges();

        const TEST_EMAIL = 'test@mail.com';
        const TEST_PASSWORD = 'test';

        fixture.componentInstance.loginForm.setValue({
            email: TEST_EMAIL,
            password: TEST_PASSWORD
        });

        const loginWaiter = fixture.componentInstance.loginProcessor.events$.pipe(first()).toPromise();

        const form = fixture.debugElement.query(By.directive(FormGroupDirective));
        form.triggerEventHandler('submit', null);

        await loginWaiter;

        expect(facade.mockSignIn).toHaveBeenCalledWith(TEST_EMAIL, TEST_PASSWORD);
    });
});
