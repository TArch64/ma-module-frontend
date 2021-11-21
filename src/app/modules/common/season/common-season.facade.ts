import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonSeasonsService } from './services';
import { Season } from './entities';

@Injectable({ providedIn: 'root' })
export class CommonSeasonFacade {
    public readonly seasons$ = this.seasonsService.seasons$;
    public readonly currentSeason$ = this.seasonsService.currentSeason$;

    public readonly isSingleSeason$ = this.seasons$.pipe(
        map((seasons) => seasons.length === 1)
    );

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
