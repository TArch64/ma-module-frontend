import {Injectable} from "@angular/core";
import {CommonSeasonsService} from "./services";
import {Observable} from "rxjs";
import {Season} from "./entities";

@Injectable()
export class CommonSeasonFacade {
    constructor(private readonly seasonsService: CommonSeasonsService) {}

    public get seasons$(): Observable<Season[]> {
        return this.seasonsService.seasons$;
    }

    public get currentSeason$(): Observable<Season | null> {
        return this.seasonsService.currentSeason$;
    }

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
