import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from "@angular/router";
import {UserRoles} from "@common/auth/enums";
import {CommonAuthService} from "@common/auth";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "@common/auth/entities";
import {map} from "rxjs/operators";

@Injectable()
export class RoleAccessGuard implements CanActivate {
    private static HOME_URL_COMMANDS: Record<UserRoles, string[]> = {
        [UserRoles.ADMIN]: ['/admin'],
        [UserRoles.MENTOR]: ['/mentor'],
        [UserRoles.STUDENT]: ['/']
    }

    constructor(
        private readonly authService: CommonAuthService,
        private readonly router: Router
    ) {}

    public canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
        if (!this.authService.isSignedIn) {
            return this.router.createUrlTree(['/auth']);
        }
        const requiredRole: UserRoles | null = route.data.requireRole;
        if (!requiredRole) return true;

        return this.authService.fetchCurrentUser().pipe(
            map(({ role }: User) => {
                if (requiredRole === role) return true;
                return this.getHomeRedirectUrlTree();
            })
        );
    }

    private getHomeRedirectUrlTree(): UrlTree {
        const {role} = this.authService.currentUser!;
        const redirectCommands = RoleAccessGuard.HOME_URL_COMMANDS[role];
        return this.router.createUrlTree(redirectCommands);
    }
}
