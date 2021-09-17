import {Injectable} from "@angular/core";
import {CommonAuthService, User} from "@common/auth";
import {Observable} from "rxjs";

@Injectable()
export class CommonAuthFacade {
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
        return this.authService.currentUser;
    }

    signOut(): void {
        this.authService.signOut();
    }

    fetchCurrentUser(): Observable<User> {
        return this.authService.fetchCurrentUser();
    }
}
