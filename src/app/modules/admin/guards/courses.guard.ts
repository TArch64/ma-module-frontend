import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonSeasonsService, Season } from '@common/season';
import { map } from 'rxjs/operators';

@Injectable()
export class CoursesGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly seasonService: CommonSeasonsService
    ) {}

    public canActivate(): Observable<UrlTree | boolean> | boolean {
        if (this.seasonService.seasonsSnapshot.length) return true;

        return this.seasonService.loadSeasons().pipe(
            map((seasons: Season[]) => {
                if (seasons.length) return true;
                return this.router.createUrlTree(['/admin', 'seasons']);
            })
        );
    }
}
