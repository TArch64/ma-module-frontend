import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ActiveSeasonService} from "./services";
import {map, mapTo} from "rxjs/operators";
import {CommonSeasonsService, Season} from "@common/season";

@Injectable()
export class ManageSeasonsFacade {
    constructor(
        private readonly activeSeasonService: ActiveSeasonService,
        private readonly commonSeasonsService: CommonSeasonsService
    ) {}

    public get activeSeason$(): Observable<Season | null> {
        return this.seasons$.pipe(
            map(seasons => seasons.find(season => season.active) ?? null)
        );
    }

    public get inactiveSeasons$(): Observable<Season[]> {
        return this.seasons$.pipe(
            map(seasons => seasons.filter(season => !season.active))
        );
    }

    public get seasons$(): Observable<Season[]> {
        return this.commonSeasonsService.seasons$;
    }

    public get hasSeasons$(): Observable<boolean> {
        return this.seasons$.pipe(
            map(seasons => !!seasons.length)
        )
    }

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
