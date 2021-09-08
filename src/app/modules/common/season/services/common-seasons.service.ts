import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Season} from "../entities";
import {CommonSeasonSyncService} from "../sync";

@Injectable({ providedIn: 'root' })
export class CommonSeasonsService {
    private seasonsSubject = new BehaviorSubject<Season[]>([]);
    private currentSeasonSubject = new BehaviorSubject<Season | null>(null);

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

    public get currentSeason$(): Observable<Season | null> {
        return this.currentSeasonSubject.asObservable();
    }

    public get currentSeasonSnapshot(): Season | null {
        return this.currentSeasonSubject.value;
    }

    public changeCurrentSeason(season: Season): void {
        this.currentSeasonSubject.next(season);
    }

    private refreshSeasonsState(seasons: Season[]): void {
        this.seasonsSubject.next(seasons);
        this.currentSeasonSubject.next(this.getCurrentSeason() ?? null);
    }

    private getCurrentSeason(): Season | null {
        if (!this.seasonsSnapshot.length) return null;
        return this.activeSeason ?? this.seasonsSnapshot.reduce((prev, current) => (prev.value > current.value) ? prev : current)
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
