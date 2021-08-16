import {Inject, Injectable} from "@angular/core";
import {IUserJSON, User} from "../entities";
import {BehaviorSubject, Observable} from "rxjs";
import {StorageService} from "@common/core";
import {CommonAuthSyncService} from "../sync";
import {mapTo, tap} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class CommonAuthService {
    private static readonly USER_CACHE_KEY = 'cu';
    private static readonly TOKEN_KEY = 'ct';
    private readonly currentUserSubject = new BehaviorSubject(this.fetchInitialCurrentUser());

    constructor(
        @Inject(StorageService.LOCAL_STORAGE)
        private readonly localStorage: StorageService,
        private readonly syncService: CommonAuthSyncService
    ) {}

    private fetchInitialCurrentUser(): User | null {
        const userJSON = this.localStorage.getItem<IUserJSON>(CommonAuthService.USER_CACHE_KEY);
        return userJSON ? User.fromJSON(userJSON) : null;
    }

    get authToken(): string | null {
        return this.localStorage.getItem(CommonAuthService.TOKEN_KEY);
    }

    get currentUser(): User | null {
        return this.currentUserSubject.value;
    }

    get isSignedIn(): boolean {
        return !!this.currentUser;
    }

    public signIn(username: string, password: string): Observable<null> {
        return this.syncService.signIn(username, password).pipe(
            tap(({ token, user }) => this.saveSignedInInfo(token, user)),
            mapTo(null)
        );
    }

    private saveSignedInInfo(token: string, userJSON: IUserJSON): void {
        this.localStorage.setItem(CommonAuthService.TOKEN_KEY, token);
        this.saveCurrentUser(userJSON);
    }

    private saveCurrentUser(userJSON: IUserJSON): void {
        this.localStorage.setItem(CommonAuthService.USER_CACHE_KEY, userJSON);
        this.currentUserSubject.next(User.fromJSON(userJSON))
    }

    public signOut() {
        this.localStorage.removeItem(CommonAuthService.TOKEN_KEY);
        this.localStorage.removeItem(CommonAuthService.USER_CACHE_KEY);
        this.currentUserSubject.next(null);
    }

    public actualizeUser(): Observable<null> {
        return this.syncService.loadCurrentUser().pipe(
            tap(json => this.saveCurrentUser(json)),
            mapTo(null)
        )
    }
}
