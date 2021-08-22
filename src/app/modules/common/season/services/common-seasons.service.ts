import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Season} from "@common/season/entities";
import {CommonSeasonSyncService} from "@common/season/sync";

@Injectable({ providedIn: 'root' })
export class CommonSeasonsService {
    public seasons: Season[] = [];
    private activeSeasonSubject = new BehaviorSubject<Season | null>(null);

    constructor(private syncService: CommonSeasonSyncService) {}

    public loadSeasons(): Observable<Season[]> {
        return this.syncService.loadSeasons().pipe(
            map(json => json.map(Season.fromJSON)),
            tap(seasons => {
                this.seasons = seasons;
                this.refreshActiveSeason();
            })
        )
    }

    public get activeSeason$(): Observable<Season | null> {
        return this.activeSeasonSubject.asObservable();
    }

    public get activeSeasonSnapshot(): Season | null {
        return this.activeSeasonSubject.value;
    }

    public changeActiveSeason(season: Season): void {
        this.activeSeasonSubject.next(season);
    }

    private refreshActiveSeason(): void {
        this.activeSeasonSubject.next(this.seasons.find(season => season.active) ?? null);
    }
}
