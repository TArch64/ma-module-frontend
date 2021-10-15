import {Resolve} from "@angular/router";
import {Inject, Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {ICommonSeasonFacade, CommonSeasonFacade} from "../common-season.facade";
import {mapTo} from "rxjs/operators";

@Injectable()
export class LoadSeasonsResolver implements Resolve<null> {
    constructor(
        @Inject(CommonSeasonFacade)
        private readonly seasonsFacade: ICommonSeasonFacade
    ) {}

    resolve(): Observable<null> {
        if (this.seasonsFacade.isSeasonsLoaded) return of(null);
        return this.seasonsFacade.loadSeasons().pipe(mapTo(null));
    }
}
