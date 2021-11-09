import { Injectable } from '@angular/core';
import { CommonAuthService, User } from '@common/auth';
import { Observable } from 'rxjs';

@Injectable()
export class CommonAuthFacade {
    constructor(
        private readonly authService: CommonAuthService
    ) {}

    public get isSignedOut(): boolean {
        return !this.isSignedIn;
    }

    public get isSignedIn(): boolean {
        return this.authService.isSignedIn;
    }

    public get authToken(): string | null {
        return this.authService.authToken;
    }

    public get currentUser(): User | null {
        return this.authService.currentUser;
    }

    public signOut(): void {
        this.authService.signOut();
    }

    public fetchCurrentUser(): Observable<User> {
        return this.authService.fetchCurrentUser();
    }
}
