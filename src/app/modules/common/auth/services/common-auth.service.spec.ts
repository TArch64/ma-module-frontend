import {Observable, of} from "rxjs";
import {IStorageService, IWindow} from "@common/core";
import {ICommonAuthSync, ISignInResponse} from '../sync';
import {IUserJSON} from "../entities";
import {UserRoles} from "../enums";
import {CommonAuthService} from './common-auth.service';

const TEST_TOKEN = 'test';

const createUserJson = (attrs: Partial<IUserJSON> = {}): IUserJSON => ({
    id: 'test',
    role: UserRoles.ADMIN,
    username: 'test',
    ...attrs
})

class MockCommonAuthSync implements ICommonAuthSync {
    public static create(): MockCommonAuthSync {
        return new MockCommonAuthSync();
    }

    mockLoadCurrentUser = jest.spyOn<ICommonAuthSync, 'loadCurrentUser'>(this, 'loadCurrentUser');

    signIn(email: string, password: string): Observable<ISignInResponse> {
        return of({token: TEST_TOKEN});
    }

    loadCurrentUser(): Observable<IUserJSON> {
        return of(createUserJson());
    }
}

class MockStorageService implements IStorageService {
    static create(): MockStorageService {
        return new MockStorageService();
    }

    readonly mockGetItem = jest.spyOn<IStorageService, 'getItem'>(this, 'getItem');
    readonly mockSetItem = jest.spyOn<IStorageService, 'setItem'>(this, 'setItem');
    readonly mockRemoveItem = jest.spyOn<IStorageService, 'removeItem'>(this, 'removeItem');

    getItem<T>(key: string): T | null {
        return null;
    }

    setItem<T>(key: string, value: T): void {}

    removeItem(key: string): void {}

    buildKey(key: string): string {
        return key;
    }
}

class MockWindow implements IWindow {
    static create(): MockWindow {
        return new MockWindow();
    }

    innerHeight = 1000;
    innerWidth = 1000;

    location = {
        reload: jest.fn()
    }

    addEventListener() {}
    removeEventListener() {}
}

function createService(sync: ICommonAuthSync, storageService: IStorageService, window: IWindow): CommonAuthService {
    return new CommonAuthService(storageService, sync, window);
}

describe('is signed in', () => {
    test('should return true if token in storage', () => {
        const storage = MockStorageService.create();
        storage.mockGetItem.mockReturnValue('test')

        const service = createService(MockCommonAuthSync.create(), storage, MockWindow.create());

        expect(service.isSignedIn).toBeTruthy();
    });

    test('should return false if no token in storage', () => {
        const storage = MockStorageService.create();
        storage.mockGetItem.mockReturnValue(null);

        const service = createService(MockCommonAuthSync.create(), storage, MockWindow.create());

        expect(service.isSignedIn).toBeFalsy();
    });
});

describe('sign in', () => {
    test('should save token', async () => {
        const storage = MockStorageService.create();
        const service = createService(MockCommonAuthSync.create(), storage, MockWindow.create());

        await service.signIn('test', 'test').toPromise();

        expect(storage.mockSetItem).toHaveBeenCalledWith(expect.any(String), TEST_TOKEN);
        expect(service.authToken).toEqual(TEST_TOKEN);
    });

    test('should update current user', async () => {
        const service = createService(MockCommonAuthSync.create(), MockStorageService.create(), MockWindow.create());

        await service.signIn('test', 'test').toPromise();

        expect(service.currentUserSnapshot).toMatchSnapshot();
    });
});

describe('sign out', () => {
    test('should remove token', () => {
        const storage = MockStorageService.create();
        const service = createService(MockCommonAuthSync.create(), storage, MockWindow.create());

        service.signOut();

        expect(storage.mockRemoveItem).toHaveBeenCalled();
    });

    test('should refresh window', () => {
        const window = MockWindow.create();
        const service = createService(MockCommonAuthSync.create(), MockStorageService.create(), window);

        service.signOut();

        expect(window.location.reload).toHaveBeenCalled();
    });
});

describe('fetch current user', () => {
    test('should load user if there no any', async () => {
        const sync = MockCommonAuthSync.create();
        const service = createService(sync, MockStorageService.create(), MockWindow.create());

        await service.fetchCurrentUser().toPromise();

        expect(sync.mockLoadCurrentUser).toHaveBeenCalled();
    });

    test('should get cached user', async () => {
        const sync = MockCommonAuthSync.create();
        const service = createService(sync, MockStorageService.create(), MockWindow.create());

        await service.signIn('test', 'test').toPromise();
        sync.mockLoadCurrentUser.mockClear();

        await service.fetchCurrentUser().toPromise();

        expect(sync.mockLoadCurrentUser).not.toHaveBeenCalled();
    });
});
