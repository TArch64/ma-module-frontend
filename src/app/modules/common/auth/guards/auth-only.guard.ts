import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { CommonAuthFacade } from '../common-auth.facade';

@Injectable()
export class AuthOnlyGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly authFacade: CommonAuthFacade
    ) {}

    public canActivate(): boolean | UrlTree {
        return this.authFacade.isSignedIn ? true : this.router.createUrlTree(['/auth']);
    }
}
