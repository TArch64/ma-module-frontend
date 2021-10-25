import {Observable, of} from "rxjs";
import {TestBed} from "@angular/core/testing";
import {ActivatedRouteSnapshot} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {User, UserRoles} from "@common/auth";
import {CommonAuthFacade, ICommonAuthFacade} from "../common-auth.facade";
import {RoleAccessGuard} from './role-access.guard';

class MockCommonAuthFacade implements ICommonAuthFacade {
    static create(): MockCommonAuthFacade {
        return new MockCommonAuthFacade();
    }

    readonly mockIsSignedOut = jest.spyOn<ICommonAuthFacade, 'isSignedOut'>(this, 'isSignedOut', 'get');
    readonly mockFetchCurrentUser = jest.spyOn<ICommonAuthFacade, 'fetchCurrentUser'>(this, 'fetchCurrentUser');

    isSignedIn: boolean = false;
    authToken: string | null = 'test';
    currentUser: User | null = null;

    get isSignedOut(): boolean {
        return false;
    }

    signOut(): void {}

    fetchCurrentUser(): Observable<User> {
        return of(User.fromJSON({
            id: 'test',
            role: UserRoles.ADMIN,
            username: 'test'
        }));
    }
}

function createGuard(facade: ICommonAuthFacade): RoleAccessGuard {
    const module = TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [
            {provide: CommonAuthFacade, useValue: facade},
            RoleAccessGuard
        ]
    });
    return module.inject(RoleAccessGuard);
}

describe('can activate', () => {
    test('should redirect unauthorized user to auth page', async () => {
        const facade = MockCommonAuthFacade.create();
        const guard = createGuard(facade);

        facade.mockIsSignedOut.mockReturnValue(true);
        const result = await guard.canActivate(new ActivatedRouteSnapshot()).toPromise();

        expect(result.toString()).toEqual('/auth');
    });

    test('should proceed if role not passed', async () => {
        const facade = MockCommonAuthFacade.create();
        const guard = createGuard(facade);

        const activatedRoute = new ActivatedRouteSnapshot();
        activatedRoute.data = { requireRole: null };
        const result = await guard.canActivate(activatedRoute).toPromise();

        expect(result).toEqual(true);
    });

    test('should proceed if passed role match user', async () => {
        const facade = MockCommonAuthFacade.create();
        const guard = createGuard(facade);

        const user = User.fromJSON({
            id: 'test',
            role: UserRoles.STUDENT,
            username: 'test'
        });
        facade.mockFetchCurrentUser.mockReturnValue(of(user));

        const activatedRoute = new ActivatedRouteSnapshot();
        activatedRoute.data = { requireRole: user.role };

        const result = await guard.canActivate(activatedRoute).toPromise();

        expect(result).toEqual(true);
    });

    test('should redirect if passed role doesnt match user', async () => {
        const facade = MockCommonAuthFacade.create();
        const guard = createGuard(facade);

        const user = User.fromJSON({
            id: 'test',
            role: UserRoles.STUDENT,
            username: 'test'
        });
        facade.currentUser = user;
        facade.mockFetchCurrentUser.mockReturnValue(of(user));

        const activatedRoute = new ActivatedRouteSnapshot();
        activatedRoute.data = { requireRole: UserRoles.ADMIN };

        const result = await guard.canActivate(activatedRoute).toPromise();

        expect(result.toString()).toEqual('/');
    });
});
