import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from "@angular/router";
import {Inject, Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../entities";
import {UserRoles} from "../enums";
import {CommonAuthFacade, ICommonAuthFacade} from "../common-auth.facade";

@Injectable()
export class RoleAccessGuard implements CanActivate {
    private static readonly HOME_URL_COMMANDS: Record<UserRoles, string[]> = {
        [UserRoles.ADMIN]: ['/admin'],
        [UserRoles.MENTOR]: ['/mentor'],
        [UserRoles.STUDENT]: ['/']
    }

    constructor(
        @Inject(CommonAuthFacade)
        private readonly authFacade: ICommonAuthFacade,
        private readonly router: Router
    ) {}

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        if (this.authFacade.isSignedOut) {
            return of(this.router.createUrlTree(['/auth']));
        }

        const requiredRole: UserRoles | null = route.data.requireRole;
        if (!requiredRole) return of(true);

        return this.authFacade.fetchCurrentUser().pipe(
            map(({ role }: User) => {
                if (requiredRole === role) return true;
                return this.getHomeRedirectUrlTree();
            })
        );
    }

    private getHomeRedirectUrlTree(): UrlTree {
        const {role} = this.authFacade.currentUser!;
        const redirectCommands = RoleAccessGuard.HOME_URL_COMMANDS[role];
        return this.router.createUrlTree(redirectCommands);
    }
}
