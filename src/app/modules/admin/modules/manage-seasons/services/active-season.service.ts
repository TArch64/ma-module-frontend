import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ISeasonManagerSync, SeasonManagerSync} from "../sync";
import {map, mapTo, tap} from "rxjs/operators";
import {CommonSeasonsService, ICommonSeasonsService, Season} from "@common/season";

@Injectable()
export class ActiveSeasonService {
    constructor(
        @Inject(CommonSeasonsService)
        private readonly commonService: ICommonSeasonsService,
        @Inject(SeasonManagerSync)
        private readonly syncService: ISeasonManagerSync
    ) {}

    public addSeason(makeActive: boolean): Observable<Season> {
        return this.syncService.addSeason(makeActive).pipe(
            map(Season.fromJSON),
            tap(() => {
                if (makeActive) this.deactivateActiveSeason();
            }),
            tap(season => this.commonService.addSeason(season))
        );
    }

    private deactivateActiveSeason(): void {
        const activeSeason = this.commonService.activeSeason;
        if (!activeSeason) return;

        this.commonService.updateSeason(activeSeason, { active: false })
    }

    public activateSeason(season: Season): Observable<null> {
        return this.syncService.activateSeason(season).pipe(
            tap(() => this.deactivateActiveSeason()),
            tap(() => this.commonService.updateSeason(season, { active: true })),
            mapTo(null)
        );
    }

    public deactivateSeason(season: Season): Observable<null> {
        return this.syncService.deactivateSeason(season).pipe(
            tap(() => this.commonService.updateSeason(season, { active: false })),
            mapTo(null)
        );
    }

    public removeSeason(season: Season): Observable<null> {
        return this.syncService.removeSeason(season).pipe(
            tap(() => this.commonService.removeSeason(season)),
            mapTo(null)
        );
    }
}
