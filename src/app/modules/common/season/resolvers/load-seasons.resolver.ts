import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { CommonSeasonFacade } from '../common-season.facade';

@Injectable({ providedIn: 'root' })
export class LoadSeasonsResolver implements Resolve<null> {
    constructor(private readonly seasonsFacade: CommonSeasonFacade) {}

    public resolve(): Observable<null> | null {
        if (this.seasonsFacade.isSeasonsLoaded) return null;
        return this.seasonsFacade.loadSeasons().pipe(mapTo(null));
    }
}
