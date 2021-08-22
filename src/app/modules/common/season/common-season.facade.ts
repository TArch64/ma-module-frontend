import {Injectable} from "@angular/core";
import {CommonSeasonsService} from "./services";
import {Observable} from "rxjs";
import {Season} from "@common/season/entities";

@Injectable()
export class CommonSeasonFacade {
    constructor(private readonly seasonsService: CommonSeasonsService) {}

    public get seasons(): Season[] {
        return this.seasonsService.seasons;
    }

    public get activeSeason(): Season | null {
        return this.seasonsService.activeSeasonSnapshot;
    }

    public get isSeasonsLoaded(): boolean {
        return !!this.seasonsService.seasons.length;
    }

    public loadSeasons(): Observable<Season[]> {
        return this.seasonsService.loadSeasons();
    }

    public changeActiveSeason(season: Season): void {
        this.seasonsService.changeActiveSeason(season);
    }
}
