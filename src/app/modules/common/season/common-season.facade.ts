import {Injectable} from "@angular/core";
import {CommonSeasonsService} from "./services";
import {Observable} from "rxjs";
import {Season} from "./entities";

@Injectable()
export class CommonSeasonFacade {
    public readonly seasons$ = this.seasonsService.seasons$;
    public readonly currentSeason$ = this.seasonsService.currentSeason$;

    constructor(private readonly seasonsService: CommonSeasonsService) {}

    public get isSeasonsLoaded(): boolean {
        return this.seasonsService.isSeasonsLoaded;
    }

    public loadSeasons(): Observable<Season[]> {
        return this.seasonsService.loadSeasons();
    }

    public changeCurrentSeason(season: Season): void {
        this.seasonsService.changeCurrentSeason(season);
    }
}
