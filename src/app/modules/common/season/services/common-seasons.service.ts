import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Season} from "../entities";
import {CommonSeasonSyncService} from "../sync";

@Injectable({ providedIn: 'root' })
export class CommonSeasonsService {
    private seasonsSubject = new BehaviorSubject<Season[]>([]);
    private activeSeasonSubject = new BehaviorSubject<Season | null>(null);

    constructor(private syncService: CommonSeasonSyncService) {}

    public get seasons$(): Observable<Season[]> {
        return this.seasonsSubject.asObservable();
    }

    public get seasonsSnapshot(): Season[] {
        return this.seasonsSubject.value;
    }

    public get isSeasonsLoaded(): boolean {
        return !!this.seasonsSnapshot.length;
    }

    public get activeSeason(): Season | null {
        return this.seasonsSnapshot.find(season => season.active) ?? null;
    }

    public loadSeasons(): Observable<Season[]> {
        return this.syncService.loadSeasons().pipe(
            map(json => json.map(Season.fromJSON)),
            tap(this.refreshSeasonsState.bind(this))
        )
    }

    public get activeSeason$(): Observable<Season | null> {
        return this.activeSeasonSubject.asObservable();
    }

    public get currentSeasonSnapshot(): Season | null {
        return this.activeSeasonSubject.value;
    }

    public changeActiveSeason(season: Season): void {
        this.activeSeasonSubject.next(season);
    }

    private refreshSeasonsState(seasons: Season[]): void {
        this.seasonsSubject.next(seasons);
        this.activeSeasonSubject.next(this.getActiveSeason() ?? null);
    }

    private getActiveSeason(): Season | null {
        if (!this.seasonsSnapshot.length) return null;
        const activeSeason = this.seasonsSnapshot.find(season => season.active);
        return activeSeason ?? this.seasonsSnapshot.reduce((prev, current) => (prev.value > current.value) ? prev : current)
    }

    public addSeason(season: Season): void {
        this.refreshSeasonsState([season, ...this.seasonsSnapshot])
    }

    public updateSeason(season: Season): void {
        const seasonIndex = this.seasonsSnapshot.findIndex(s => s.id === season.id);
        const seasons = this.seasonsSnapshot.slice();
        seasons.splice(seasonIndex, 1, season);
        this.refreshSeasonsState(seasons);
    }
}
