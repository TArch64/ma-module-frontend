import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { CommonSeasonsService, Season } from '@common/season';
import { SeasonManagerSync } from '../sync';

@Injectable({ providedIn: 'root' })
export class ActiveSeasonService {
    constructor(
        private readonly commonService: CommonSeasonsService,
        private readonly syncService: SeasonManagerSync
    ) {}

    public addSeason(makeActive: boolean): Observable<Season> {
        return this.syncService.addSeason(makeActive).pipe(
            map(Season.fromJSON),
            tap((): void => {
                if (makeActive) this.deactivateActiveSeason();
            }),
            tap((season): void => this.commonService.addSeason(season))
        );
    }

    private deactivateActiveSeason(): void {
        const activeSeason = this.commonService.activeSeason;
        if (!activeSeason) return;

        const oldActiveSeason = activeSeason.clone({ active: false });
        this.commonService.updateSeason(oldActiveSeason);
    }

    public activateSeason(season: Season): Observable<null> {
        return this.syncService.activateSeason(season).pipe(
            tap((): void => this.deactivateActiveSeason()),
            tap((): void => this.commonService.updateSeason(season.clone({ active: true }))),
            mapTo(null)
        );
    }

    public deactivateSeason(season: Season): Observable<null> {
        return this.syncService.deactivateSeason(season).pipe(
            tap((): void => this.commonService.updateSeason(season.clone({ active: false }))),
            mapTo(null)
        );
    }

    public removeSeason(season: Season): Observable<null> {
        return this.syncService.removeSeason(season).pipe(
            tap((): void => this.commonService.removeSeason(season)),
            mapTo(null)
        );
    }
}
