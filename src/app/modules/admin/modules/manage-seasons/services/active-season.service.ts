import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {formatValidationHttpResponse} from "@common/core";
import {SeasonManagerSync} from "../sync";
import {map, mapTo, tap} from "rxjs/operators";
import {CommonSeasonsService, Season} from "@common/season";

@Injectable()
export class ActiveSeasonService {
    constructor(
        private readonly commonService: CommonSeasonsService,
        private readonly syncService: SeasonManagerSync
    ) {}

    public addSeason(makeActive: boolean): Observable<Season> {
        return this.syncService.addSeason(makeActive).pipe(
            map(Season.fromJSON),
            tap(() => {
                if (!makeActive || !this.commonService.activeSeason) return;

                const oldActiveSeason = this.commonService.activeSeason.clone({ active: false });
                this.commonService.updateSeason(oldActiveSeason)
            }),
            tap(season => this.commonService.addSeason(season))
        );
    }

    public startSeason(): Observable<null> {
        return this.syncService.startSeason().pipe(
            mapTo(null),
            formatValidationHttpResponse
        );
    }

    public finishSeason(): Observable<null> {
        return this.syncService.finishActiveSeason().pipe(
            mapTo(null),
            formatValidationHttpResponse
        );
    }
}
