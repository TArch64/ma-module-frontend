import {Inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {ISeasonJSON, Season} from "../entities";
import {CommonSeasonSync, ICommonSeasonSync} from "../sync";

export interface ICommonSeasonsService {
    seasons$: Observable<Season[]>;
    seasonsSnapshot: Season[];
    isSeasonsLoaded: boolean;
    activeSeason: Season | null;

    currentSeason$: Observable<Season | null>;
    currentSeasonSnapshot: Season | null;

    loadSeasons(): Observable<Season[]>;
    changeCurrentSeason(season: Season): void;
    addSeason(season: Season): void;
    updateSeason(season: Season, changes: Partial<ISeasonJSON>): void;
    removeSeason(season: Season): void;
}

@Injectable({ providedIn: 'root' })
export class CommonSeasonsService implements ICommonSeasonsService {
    private readonly seasonsSubject = new BehaviorSubject<Season[]>([]);
    private readonly currentSeasonSubject = new BehaviorSubject<Season | null>(null);
    public readonly seasons$ = this.seasonsSubject.asObservable();

    public readonly currentSeason$ = this.currentSeasonSubject.asObservable();

    constructor(
        @Inject(CommonSeasonSync)
        private readonly syncService: ICommonSeasonSync
    ) {}

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

    public updateSeason(season: Season, changes: Partial<ISeasonJSON>): void {
        const seasonIndex = this.seasonsSnapshot.findIndex(s => s.id === season.id);
        const seasons = this.seasonsSnapshot.slice();
        seasons.splice(seasonIndex, 1, season.clone(changes));
        this.refreshSeasonsState(seasons);
    }

    public removeSeason(season: Season): void {
        this.refreshSeasonsState(this.seasonsSnapshot.filter(s => s.id !== season.id));
    }
}
