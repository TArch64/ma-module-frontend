import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { CommonAuthFacade } from '../common-auth.facade';

@Injectable({ providedIn: 'root' })
export class InauthOnlyGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly authFacade: CommonAuthFacade
    ) {}

    public canActivate(): boolean | UrlTree {
        return this.authFacade.isSignedOut ? true : this.router.createUrlTree(['']);
    }
}
