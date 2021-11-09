import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { formatValidationHttpResponse, StorageService, WindowProvider } from '@common/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { CommonAuthSyncService } from '../sync';
import { IUserJSON, User } from '../entities';

@Injectable({ providedIn: 'root' })
export class CommonAuthService {
    private static readonly TOKEN_KEY = 'ct';
    public authToken: string | null = this.fetchSavedToken();
    private readonly currentUserSubject = new BehaviorSubject<null | User>(null);

    constructor(
        @Inject(StorageService.LOCAL_STORAGE)
        private readonly localStorage: StorageService,
        private readonly syncService: CommonAuthSyncService,
        @Inject(WindowProvider)
        private readonly window: Window
    ) {}

    private fetchSavedToken(): string | null {
        return this.localStorage.getItem(CommonAuthService.TOKEN_KEY);
    }

    public get currentUser(): User | null {
        return this.currentUserSubject.value;
    }

    public get currentUser$(): Observable<User | null> {
        return this.currentUserSubject.asObservable();
    }

    public get isSignedIn(): boolean {
        return !!this.authToken;
    }

    public signIn(email: string, password: string): Observable<User> {
        return this.syncService.signIn(email, password).pipe(
            formatValidationHttpResponse,
            tap(({ token }): void => this.saveAuthToken(token)),
            switchMap((): Observable<User> => this.actualizeUser())
        );
    }

    private saveAuthToken(token: string): void {
        this.authToken = token;
        this.localStorage.setItem(CommonAuthService.TOKEN_KEY, token);
    }

    public signOut(): void {
        this.localStorage.removeItem(CommonAuthService.TOKEN_KEY);
        this.window.location.reload();
    }

    public actualizeUser(): Observable<User> {
        return this.syncService.loadCurrentUser().pipe(
            map((json): User => this.saveCurrentUser(json))
        );
    }

    private saveCurrentUser(userJSON: IUserJSON): User {
        this.currentUserSubject.next(User.fromJSON(userJSON));
        return this.currentUser!;
    }

    public fetchCurrentUser(): Observable<User> {
        if (this.currentUser) return of(this.currentUser);
        return this.actualizeUser();
    }
}
