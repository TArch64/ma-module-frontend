import {Injectable} from "@angular/core";
import {CommonSeasonsService} from "./services";
import {Observable} from "rxjs";
import {Season} from "./entities";

export interface ICommonSeasonFacade {
    seasons$: Observable<Season[]>;
    currentSeason$: Observable<Season | null>;
    isSeasonsLoaded: boolean;
    loadSeasons(): Observable<Season[]>;
    changeCurrentSeason(season: Season): void;
}

@Injectable()
export class CommonSeasonFacade implements ICommonSeasonFacade {
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
