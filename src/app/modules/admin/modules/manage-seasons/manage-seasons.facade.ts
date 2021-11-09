import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { CommonSeasonsService, Season } from '@common/season';
import { ActiveSeasonService } from './services';

@Injectable()
export class ManageSeasonsFacade {
    public readonly seasons$ = this.commonSeasonsService.seasons$;

    public readonly activeSeason$ = this.seasons$.pipe(
        map((seasons): Season | null => {
            return seasons.find((season): boolean => season.active) ?? null;
        })
    );

    public readonly inactiveSeasons$ = this.seasons$.pipe(
        map((seasons): Season[] => {
            return seasons.filter((season): boolean => !season.active);
        })
    );

    public readonly hasSeasons$ = this.seasons$.pipe(
        map((seasons): boolean => !!seasons.length)
    );

    constructor(
        private readonly activeSeasonService: ActiveSeasonService,
        private readonly commonSeasonsService: CommonSeasonsService
    ) {}

    public addSeason(makeActive: boolean): Observable<null> {
        return this.activeSeasonService.addSeason(makeActive).pipe(mapTo(null));
    }

    public activateSeason(season: Season): Observable<null> {
        return this.activeSeasonService.activateSeason(season);
    }

    public deactivateSeason(season: Season): Observable<null> {
        return this.activeSeasonService.deactivateSeason(season);
    }

    public removeSeason(season: Season): Observable<null> {
        return this.activeSeasonService.removeSeason(season);
    }
}
