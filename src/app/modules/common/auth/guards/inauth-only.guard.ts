import {CanActivate, Router, UrlTree} from "@angular/router";
import {CommonAuthService} from "../services";
import {Injectable} from "@angular/core";

@Injectable()
export class InauthOnlyGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly authService: CommonAuthService
    ) {}

    public canActivate(): boolean | UrlTree {
        return !this.authService.isSignedIn ? true : this.router.createUrlTree(['']);
    }
}
