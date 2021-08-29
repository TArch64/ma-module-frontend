import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ActiveSeasonService} from "./services";
import {map} from "rxjs/operators";

@Injectable()
export class ManageSeasonsFacade {
    constructor(private readonly activeSeasonService: ActiveSeasonService) {}

    public loadState(): Observable<null> {
        return this.activeSeasonService.loadManagerState();
    }

    public get isAnySeasonActive$(): Observable<boolean> {
        return this.activeSeasonService.state$.pipe(
            map(state => state.isAnySeasonActive)
        )
    }
}
