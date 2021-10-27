import {Injectable} from "@angular/core";
import {CommonSeasonsService, Season} from "@common/season";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";

export interface IAdminFacade {
    hasSeasons$: Observable<boolean>;
    loadSeasons(): Observable<Season[]>;
}

@Injectable()
export class AdminFacade implements IAdminFacade {
    public readonly hasSeasons$ = this.seasonsService.seasons$.pipe(
        map(seasons => !!seasons.length)
    );

    constructor(
        private readonly seasonsService: CommonSeasonsService
    ) {}

    loadSeasons(): Observable<Season[]> {
        if (this.seasonsService.seasonsSnapshot) {
            return of(this.seasonsService.seasonsSnapshot);
        }
        return this.seasonsService.loadSeasons();
    }
}
