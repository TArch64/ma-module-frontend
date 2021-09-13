import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CommonSeasonsService} from "@common/season";
import {map} from "rxjs/operators";

@Injectable()
export class AdminFacade {
    constructor(private readonly seasonsService: CommonSeasonsService) {}

    public get hasSeasons$(): Observable<boolean> {
        return this.seasonsService.seasons$.pipe(
            map(seasons => !!seasons.length)
        )
    }
}
