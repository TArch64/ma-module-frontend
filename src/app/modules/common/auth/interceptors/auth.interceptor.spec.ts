import {Observable, of, throwError} from "rxjs";
import {HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpRequest} from "@angular/common/http";
import {User, UserRoles} from "@common/auth";
import {ICommonAuthFacade} from "../common-auth.facade";
import {AuthInterceptor} from './auth.interceptor';

class MockCommonAuthFacade implements ICommonAuthFacade {
    static create(): MockCommonAuthFacade {
        return new MockCommonAuthFacade();
    }

    mockIsSignedIn = jest.spyOn<ICommonAuthFacade, 'isSignedIn'>(this, 'isSignedIn', 'get');
    mockSignOut = jest.spyOn<ICommonAuthFacade, 'signOut'>(this, 'signOut');

    isSignedOut: boolean = false;
    authToken: string | null = 'test';
    currentUser: User | null = null;

    get isSignedIn(): boolean {
        return false;
    };

    signOut(): void {}

    fetchCurrentUser(): Observable<User> {
        return of(User.fromJSON({
            id: 'test',
            role: UserRoles.ADMIN,
            username: 'test'
        }))
    }
}

class MockHttpHandler extends HttpHandler {
    static create(): MockHttpHandler {
        return new MockHttpHandler();
    }

    mockHandle = jest.spyOn<HttpHandler, 'handle'>(this, 'handle');

    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return of({type: HttpEventType.Sent});
    }
}

function createInterceptor(facade: ICommonAuthFacade): AuthInterceptor {
    return new AuthInterceptor(facade);
}

function createRequest(): HttpRequest<any> {
    return new HttpRequest('GET', 'test');
}

describe('insert auth token', () => {
    test('should insert token if signed in', () => {
        const facade = MockCommonAuthFacade.create();
        facade.mockIsSignedIn.mockReturnValue(true);

        const interceptor = createInterceptor(facade);
        const handler = MockHttpHandler.create();

        interceptor.intercept(createRequest(), handler);

        expect(handler.mockHandle).toHaveBeenCalled();
        expect(handler.mockHandle.mock.calls[0][0].headers.get('Authorization')).toMatchSnapshot();
    });

    test('should not insert token if not signed in', () => {
        const facade = MockCommonAuthFacade.create();
        facade.mockIsSignedIn.mockReturnValue(false);

        const interceptor = createInterceptor(facade);
        const handler = MockHttpHandler.create();

        interceptor.intercept(createRequest(), handler);

        expect(handler.mockHandle).toHaveBeenCalled();
        expect(handler.mockHandle.mock.calls[0][0].headers.get('Authorization')).toBeFalsy();
    });
});

describe('error handler', () => {
    test('should sign out on unauthorized', async () => {
        const facade = MockCommonAuthFacade.create();
        const interceptor = createInterceptor(facade);
        const handler = MockHttpHandler.create();

        handler.mockHandle.mockReturnValue(throwError(new HttpErrorResponse({ status: 403 })))
        await interceptor.intercept(createRequest(), handler).toPromise().catch(() => {});

        expect(facade.mockSignOut).toHaveBeenCalled();
    });

    test('should rethrow on other error', async () => {
        const facade = MockCommonAuthFacade.create();
        const interceptor = createInterceptor(facade);
        const handler = MockHttpHandler.create();

        const error = new Error('test');
        handler.mockHandle.mockReturnValue(throwError(error))

        await expect(interceptor.intercept(createRequest(), handler).toPromise()).rejects.toEqual(error);
        expect(facade.mockSignOut).not.toHaveBeenCalled();
    });
});
