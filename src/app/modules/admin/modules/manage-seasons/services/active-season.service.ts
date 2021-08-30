import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {ManagerState} from "../entities";
import {captureExistsValues, formatValidationHttpResponse} from "@common/core";
import {SeasonManagerSync} from "../sync";
import {mapTo} from "rxjs/operators";
import {CommonSeasonsService} from "@common/season";

@Injectable()
export class ActiveSeasonService {
    private stateSubject = new BehaviorSubject<ManagerState | null>(null);

    constructor(
        private readonly commonService: CommonSeasonsService,
        private readonly syncService: SeasonManagerSync
    ) {}

    public get state$(): Observable<ManagerState> {
        return this.stateSubject.asObservable().pipe(captureExistsValues);
    }

    public loadManagerState(): void {
        const state = ManagerState.fromJSON({
            isAnySeasonActive: this.commonService.isAnySeasonActive
        });
        this.stateSubject.next(state);
    }

    public startSeason(): Observable<null> {
        return this.syncService.startSeason().pipe(
            mapTo(null),
            formatValidationHttpResponse
        );
    }

    public finishSeason(): Observable<null> {
        return this.syncService.finishActiveSeason().pipe(
            mapTo(null),
            formatValidationHttpResponse
        );
    }
}
