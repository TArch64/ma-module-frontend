import {Injectable} from "@angular/core";
import {CommonAuthService, User} from "@common/auth";
import {Observable} from "rxjs";

export interface ICommonAuthFacade {
    isSignedOut: boolean;
    isSignedIn: boolean;
    authToken: string | null;
    currentUser: User | null;

    signOut(): void;
    fetchCurrentUser(): Observable<User>;
}

@Injectable()
export class CommonAuthFacade implements ICommonAuthFacade {
    constructor(
        private readonly authService: CommonAuthService,
    ) {}

    get isSignedOut(): boolean {
        return !this.isSignedIn;
    }

    get isSignedIn(): boolean {
        return this.authService.isSignedIn;
    }

    get authToken(): string | null {
        return this.authService.authToken;
    }

    get currentUser(): User | null {
        return this.authService.currentUserSnapshot;
    }

    signOut(): void {
        this.authService.signOut();
    }

    fetchCurrentUser(): Observable<User> {
        return this.authService.fetchCurrentUser();
    }
}
