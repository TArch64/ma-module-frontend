import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ActiveSeasonService} from "./services";
import {map, mapTo, tap} from "rxjs/operators";
import {CommonSeasonsService} from "@common/season";
import {Season} from "@common/season/entities";

@Injectable()
export class ManageSeasonsFacade {
    constructor(
        private readonly activeSeasonService: ActiveSeasonService,
        private readonly commonSeasonsService: CommonSeasonsService
    ) {}

    public loadState(): void {
        this.activeSeasonService.loadManagerState();
    }

    public get isAnySeasonActive$(): Observable<boolean> {
        return this.activeSeasonService.state$.pipe(
            map(state => state.isAnySeasonActive)
        )
    }

    public get activeSeason(): Season | null {
        return this.commonSeasonsService.seasonsSnapshot.find(season => season.active) ?? null;
    }

    public startSeason(): Observable<null> {
        return this.activeSeasonService.startSeason();
    }

    public finishSeason(): Observable<null> {
        return this.activeSeasonService.finishSeason();
    }

    public refreshActiveSeason(): Observable<null> {
        return this.commonSeasonsService.loadSeasons().pipe(
            tap(() => this.loadState()),
            mapTo(null)
        );
    }
}
