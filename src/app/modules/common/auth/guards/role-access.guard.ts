import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../entities';
import { UserRoles } from '../enums';
import { CommonAuthFacade } from '../common-auth.facade';

@Injectable({ providedIn: 'root' })
export class RoleAccessGuard implements CanActivate {
    private static readonly HOME_URL_COMMANDS: Record<UserRoles, string[]> = {
        [UserRoles.ADMIN]: ['/admin'],
        [UserRoles.MENTOR]: ['/mentor'],
        [UserRoles.STUDENT]: ['/']
    };

    constructor(
        private readonly authFacade: CommonAuthFacade,
        private readonly router: Router
    ) {}

    public canActivate(route: ActivatedRouteSnapshot): true | UrlTree | Observable<true | UrlTree> {
        if (this.authFacade.isSignedOut) {
            return this.router.createUrlTree(['/auth']);
        }
        const requiredRole: UserRoles | null = route.data.requireRole;
        if (!requiredRole) return true;

        return this.authFacade.fetchCurrentUser().pipe(
            map(({ role }: User): UrlTree | true => {
                if (requiredRole === role) return true;
                return this.getHomeRedirectUrlTree();
            })
        );
    }

    private getHomeRedirectUrlTree(): UrlTree {
        const { role } = this.authFacade.currentUser!;
        const redirectCommands = RoleAccessGuard.HOME_URL_COMMANDS[role];
        return this.router.createUrlTree(redirectCommands);
    }
}
