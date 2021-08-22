import {Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CommonSeasonFacade} from "../common-season.facade";
import {mapTo} from "rxjs/operators";

@Injectable()
export class LoadSeasonsResolver implements Resolve<null> {
    constructor(private readonly seasonsFacade: CommonSeasonFacade) {}

    resolve(): Observable<null> | null {
        if (this.seasonsFacade.isSeasonsLoaded) return null;
        return this.seasonsFacade.loadSeasons().pipe(mapTo(null));
    }
}
