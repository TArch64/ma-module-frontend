import {CanActivate, Router, UrlTree} from "@angular/router";
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Season} from "@common/season";
import {AdminFacade, IAdminFacade} from "../admin.facade";

@Injectable()
export class CoursesGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        @Inject(AdminFacade)
        private readonly facade: IAdminFacade
    ) {}

    public canActivate(): Observable<UrlTree | boolean> {
        return this.facade.loadSeasons().pipe(
            map((seasons: Season[]) => {
                if (seasons.length) return true;
                return this.router.createUrlTree(['/admin', 'seasons']);
            })
        );
    }
}
