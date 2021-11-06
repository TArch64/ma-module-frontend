import {Inject, Injectable} from "@angular/core";
import {IUserJSON, User} from "../entities";
import {BehaviorSubject, Observable, of} from "rxjs";
import {formatValidationHttpResponse} from "@common/core/helpers";
import {StorageService} from "@common/core/services";
import {CommonAuthSyncService} from "../sync";
import {map, switchMap, tap} from "rxjs/operators";

export interface ICommonAuthService {
    authToken: string | null;
    currentUser: User | null;
    currentUser$: Observable<User | null>;
    isSignedIn: boolean;
    signIn(email: string, password: string): Observable<User>;
    signOut(): void;
    actualizeUser(): Observable<User>;
    fetchCurrentUser(): Observable<User>;
}

@Injectable({ providedIn: 'root' })
export class CommonAuthService implements ICommonAuthService {
    private static readonly TOKEN_KEY = 'ct';
    public authToken: string | null = this.fetchSavedToken();
    private readonly currentUserSubject = new BehaviorSubject<null | User>(null);

    constructor(
        @Inject(StorageService.LOCAL_STORAGE)
        private readonly localStorage: StorageService,
        private readonly syncService: CommonAuthSyncService
    ) {}

    private fetchSavedToken(): string | null {
        return this.localStorage.getItem(CommonAuthService.TOKEN_KEY);
    }

    get currentUser(): User | null {
        return this.currentUserSubject.value;
    }

    get currentUser$(): Observable<User | null> {
        return this.currentUserSubject.asObservable();
    }

    get isSignedIn(): boolean {
        return !!this.authToken;
    }

    public signIn(email: string, password: string): Observable<User> {
        return this.syncService.signIn(email, password).pipe(
            formatValidationHttpResponse,
            tap(({ token }) => this.saveAuthToken(token)),
            switchMap(() => this.actualizeUser())
        );
    }

    private saveAuthToken(token: string): void {
        this.authToken = token;
        this.localStorage.setItem(CommonAuthService.TOKEN_KEY, token);
    }

    public signOut(): void {
        this.localStorage.removeItem(CommonAuthService.TOKEN_KEY);
        window.location.reload();
    }

    public actualizeUser(): Observable<User> {
        return this.syncService.loadCurrentUser().pipe(
            map(json => this.saveCurrentUser(json))
        )
    }

    private saveCurrentUser(userJSON: IUserJSON): User {
        this.currentUserSubject.next(User.fromJSON(userJSON))
        return this.currentUser!;
    }

    public fetchCurrentUser(): Observable<User> {
        if (this.currentUser) return of(this.currentUser);
        return this.actualizeUser();
    }
}
