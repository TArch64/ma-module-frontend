import {Observable, of} from "rxjs";
import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {User, UserRoles} from "@common/auth";
import {CommonAuthFacade, ICommonAuthFacade} from "../common-auth.facade";
import {InauthOnlyGuard} from './inauth-only.guard';

class MockCommonAuthFacade implements ICommonAuthFacade {
    static create(): MockCommonAuthFacade {
        return new MockCommonAuthFacade();
    }

    readonly mockIsSignedOut = jest.spyOn<ICommonAuthFacade, 'isSignedOut'>(this, 'isSignedOut', 'get');

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

function createGuard(facade: ICommonAuthFacade): InauthOnlyGuard {
    const module = TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [
            {provide: CommonAuthFacade, useValue: facade},
            InauthOnlyGuard
        ]
    });
    return module.inject(InauthOnlyGuard);
}

describe('can activate', () => {
    test('should proceed if not authorized', () => {
        const facade = MockCommonAuthFacade.create();
        const guard = createGuard(facade);

        facade.mockIsSignedOut.mockReturnValue(true);

        expect(guard.canActivate()).toEqual(true);
    });

    test('should redirect if authorized', () => {
        const facade = MockCommonAuthFacade.create();
        const guard = createGuard(facade);

        facade.mockIsSignedOut.mockReturnValue(false);

        expect(guard.canActivate().toString()).toEqual('/');
    });
});
