import {Observable, of} from "rxjs";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {MatButtonModule} from "@angular/material/button";
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {IUserJSON, User, UserRoles} from "@common/auth";
import {SquareComponent, RoleTitlePipe} from "@common/core";
import {ILayoutFacade, LayoutFacade} from "@common/layout/layout.facade";
import {LayoutCurrentUserComponent} from './layout-current-user.component';

class MockLayoutFacade implements ILayoutFacade {
    public mockSignOut = jest.spyOn<ILayoutFacade, 'signOut'>(this, 'signOut')

    public progressBarVisibility$ = of(false);
    public currentUser$: Observable<User | null>;
    public isMobileSnapshot = false;
    public isMobile$ = of(false);
    public mobileNavigation$ = of(null);

    constructor(currentUser: User | null) {
        this.currentUser$ = of(currentUser);
    }

    signOut() {}
}

function createComponent(facade: ILayoutFacade): ComponentFixture<LayoutCurrentUserComponent> {
    const module = TestBed.configureTestingModule({
        imports: [MatButtonModule, MatMenuModule, MatIconModule],
        providers: [
            {provide: LayoutFacade, useValue: facade}
        ],
        declarations: [
            LayoutCurrentUserComponent,
            SquareComponent,
            RoleTitlePipe
        ]
    });
    module.overrideComponent(MatMenu, {
        set: {template: '<ng-content></ng-content>'}
    })
    return module.createComponent(LayoutCurrentUserComponent);
}

function createUser(attrs: Partial<IUserJSON> = {}): User {
    return User.fromJSON({
        id: 'test',
        username: 'test',
        role: UserRoles.ADMIN,
        ...attrs
    })
}

describe('rendering', () => {
    test('should not render if no user', () => {
        const facade = new MockLayoutFacade(null);
        const fixture = createComponent(facade);
        fixture.detectChanges();

        const userEl = fixture.debugElement.query(By.css('.layout-current-user'));
        expect(userEl).toBeFalsy();
    });

    test('should render if there are user', () => {
        const facade = new MockLayoutFacade(createUser());
        const fixture = createComponent(facade);
        fixture.detectChanges();

        const userEl = fixture.debugElement.query(By.css('.layout-current-user'));
        expect(userEl).toBeTruthy();
    });
});

describe('sign out', () => {
    test('should sign out', () => {
        const facade = new MockLayoutFacade(createUser());
        const fixture = createComponent(facade);
        fixture.detectChanges();

        const signOutButton = fixture.debugElement.query(By.css('[data-test-selector="sign-out"]'));
        signOutButton.triggerEventHandler('click', null);

        expect(facade.mockSignOut).toHaveBeenCalled();
    });
});
