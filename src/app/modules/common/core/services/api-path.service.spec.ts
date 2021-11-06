import {ApiPathService} from "./api-path.service";
import {ICommonAuthService, User, UserRoles} from "@common/auth";
import {Observable, of} from "rxjs";

const createUser = (role: UserRoles) => User.fromJSON({
    id: 'test',
    username: 'test',
    role
})

class MockAuthService implements ICommonAuthService {
    public authToken = null;
    public currentUser$: Observable<User | null>;
    isSignedIn: boolean = true;

    constructor(
        public currentUser: User | null
    ) {
        this.currentUser$ = of(currentUser);
    }

    signIn(email: string, password: string): Observable<User> {
        return this.fetchCurrentUser();
    }

    signOut(): void {}

    actualizeUser(): Observable<User> {
        return this.fetchCurrentUser();
    }

    fetchCurrentUser(): Observable<User> {
        return of(createUser(UserRoles.ADMIN))
    }
}

function createService(currentUser: User | null) {
    const service = new ApiPathService({
        production: true,
        apiUrl: 'http://test'
    });
    service.setAuthService(new MockAuthService(currentUser));
    return service;
}

describe('build', () => {
    test('should build api path', () => {
        const service = createService(null);

        expect(service.build(['users', 11])).toMatchSnapshot();
    });
});

describe('build role path', () => {
    test('should throw error if there are no user', () => {
        const service = createService(null);

        expect(() => service.buildRolePath(['users'])).toThrowErrorMatchingSnapshot()
    });

    test('should build admin path', () => {
        const service = createService(createUser(UserRoles.ADMIN));

        expect(service.buildRolePath(['users', 11])).toMatchSnapshot();
    });

    test('should build mentor path', () => {
        const service = createService(createUser(UserRoles.MENTOR));

        expect(service.buildRolePath(['users', 11])).toMatchSnapshot();
    });

    test('should build student path', () => {
        const service = createService(createUser(UserRoles.STUDENT));

        expect(service.buildRolePath(['users', 11])).toMatchSnapshot();
    });
});
