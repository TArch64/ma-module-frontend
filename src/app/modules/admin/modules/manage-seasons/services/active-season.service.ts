import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {IManagerStateJSON, ManagerState} from "../entities";
import {captureExistsValues} from "@common/core";
import {SeasonManagerSync} from "../sync";
import {mapTo, tap} from "rxjs/operators";

@Injectable()
export class ActiveSeasonService {
    private stateSubject = new BehaviorSubject<ManagerState | null>(null);

    constructor(private readonly syncService: SeasonManagerSync) {}

    public get state$(): Observable<ManagerState> {
        return this.stateSubject.asObservable().pipe(captureExistsValues);
    }

    public loadManagerState(): Observable<null> {
        if (this.stateSubject.value) return of(null);

        return this.syncService.loadState().pipe(
            tap(this.saveState.bind(this)),
            mapTo(null)
        )
    }

    private saveState(stateJSON: IManagerStateJSON): void {
        this.stateSubject.next(ManagerState.fromJSON(stateJSON));
    }
}
