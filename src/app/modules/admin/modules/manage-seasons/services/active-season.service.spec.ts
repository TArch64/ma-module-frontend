import {Observable, of} from "rxjs";
import {ICommonSeasonsService, ISeasonJSON, Season} from "@common/season";
import {ISeasonManagerSync} from "../sync";
import {ActiveSeasonService} from "./active-season.service";

class MockCommonSeasonsService implements ICommonSeasonsService {
    static create(): MockCommonSeasonsService {
        return new MockCommonSeasonsService();
    }

    readonly mockActiveSeason = jest.spyOn<ICommonSeasonsService, 'activeSeason'>(this, 'activeSeason', 'get');
    readonly mockAddSeason = jest.spyOn<ICommonSeasonsService, 'addSeason'>(this, 'addSeason');
    readonly mockUpdateSeason = jest.spyOn<ICommonSeasonsService, 'updateSeason'>(this, 'updateSeason');
    readonly mockRemoveSeason = jest.spyOn<ICommonSeasonsService, 'removeSeason'>(this, 'removeSeason');

    seasons$: Observable<Season[]> = of([]);
    seasonsSnapshot: Season[] = [];
    isSeasonsLoaded: boolean = true;

    currentSeason$: Observable<Season | null> = of(null);
    currentSeasonSnapshot: Season | null = null;

    get activeSeason(): Season | null {
        return null;
    }

    loadSeasons(): Observable<Season[]> {
        return of([]);
    }

    changeCurrentSeason(season: Season): void {}
    addSeason(season: Season): void {}
    updateSeason(season: Season, changes: Partial<ISeasonJSON>): void {}
    removeSeason(season: Season): void {}
}

const createSeasonJson = (attrs: Partial<ISeasonJSON> = {}): ISeasonJSON => ({
    id: 'test',
    year: 2021,
    active: false,
    value: 1,
    ...attrs
})

function createSeason(attrs: Partial<ISeasonJSON> = {}): Season {
    return Season.fromJSON(createSeasonJson(attrs));
}

class MockSeasonManagerSync implements ISeasonManagerSync {
    static create(): MockSeasonManagerSync {
        return new MockSeasonManagerSync();
    }

    addSeason(makeActive: boolean): Observable<ISeasonJSON> {
        return of(createSeasonJson());
    }

    activateSeason(season: Season): Observable<object> {
        return of({});
    }

    deactivateSeason(season: Season): Observable<object> {
        return of({});
    }

    removeSeason(season: Season): Observable<object> {
        return of({});
    }
}

function createService(seasonsService: ICommonSeasonsService, sync: ISeasonManagerSync): ActiveSeasonService {
    return new ActiveSeasonService(seasonsService, sync);
}

describe('add season', () => {
    test('should add new season', async () => {
        const seasonsService = MockCommonSeasonsService.create();
        const sync = MockSeasonManagerSync.create();
        const service = createService(seasonsService, sync);

        await service.addSeason(true).toPromise();

        expect(seasonsService.mockAddSeason).toHaveBeenCalledWith(expect.any(Season));
    });

    test('should deactivate current active', async () => {
        const seasonsService = MockCommonSeasonsService.create();
        const sync = MockSeasonManagerSync.create();
        const service = createService(seasonsService, sync);

        const activeSeason = createSeason({ id: 'current-active' })
        seasonsService.mockActiveSeason.mockReturnValue(activeSeason);

        await service.addSeason(true).toPromise();

        expect(seasonsService.mockUpdateSeason).toHaveBeenCalledWith(activeSeason, { active: false });
    });

    test('should not deactivate old if no active', async () => {
        const seasonsService = MockCommonSeasonsService.create();
        const sync = MockSeasonManagerSync.create();
        const service = createService(seasonsService, sync);

        seasonsService.mockActiveSeason.mockReturnValue(null);

        await service.addSeason(true).toPromise();

        expect(seasonsService.mockUpdateSeason).not.toHaveBeenCalled();
    });

    test('should not deactivate old if makeActive false', async () => {
        const seasonsService = MockCommonSeasonsService.create();
        const sync = MockSeasonManagerSync.create();
        const service = createService(seasonsService, sync);

        const activeSeason = createSeason({ id: 'current-active' })
        seasonsService.mockActiveSeason.mockReturnValue(activeSeason);

        await service.addSeason(false).toPromise();

        expect(seasonsService.mockUpdateSeason).not.toHaveBeenCalled();
    });
});

describe('activate season', () => {
    test('should activate season', async () => {
        const seasonsService = MockCommonSeasonsService.create();
        const sync = MockSeasonManagerSync.create();
        const service = createService(seasonsService, sync);

        const activeSeason = createSeason({ id: 'current-active' })
        await service.activateSeason(activeSeason).toPromise();

        expect(seasonsService.mockUpdateSeason).toHaveBeenCalledWith(activeSeason, { active: true });
    });

    test('should deactivate old if any', async () => {
        const seasonsService = MockCommonSeasonsService.create();
        const sync = MockSeasonManagerSync.create();
        const service = createService(seasonsService, sync);

        const activeSeason = createSeason({ id: 'current-active' })
        seasonsService.mockActiveSeason.mockReturnValue(activeSeason);

        await service.activateSeason(createSeason()).toPromise();

        expect(seasonsService.mockUpdateSeason).toHaveBeenCalledWith(activeSeason, { active: false });
    });

    test('should not deactivate old if no active', async () => {
        const seasonsService = MockCommonSeasonsService.create();
        const sync = MockSeasonManagerSync.create();
        const service = createService(seasonsService, sync);

        seasonsService.mockActiveSeason.mockReturnValue(null);

        const season = createSeason();
        await service.activateSeason(season).toPromise();

        expect(seasonsService.mockUpdateSeason).not.toHaveBeenCalledWith(season, { active: false });
    });
});

describe('deactivate season', () => {
    test('should deactivate season', async () => {
        const seasonsService = MockCommonSeasonsService.create();
        const sync = MockSeasonManagerSync.create();
        const service = createService(seasonsService, sync);

        const activeSeason = createSeason({ id: 'current-active' })
        await service.deactivateSeason(activeSeason).toPromise();

        expect(seasonsService.mockUpdateSeason).toHaveBeenCalledWith(activeSeason, { active: false });
    });
});

describe('remove season', () => {
    test('should remove season', async () => {
        const seasonsService = MockCommonSeasonsService.create();
        const sync = MockSeasonManagerSync.create();
        const service = createService(seasonsService, sync);

        const season = createSeason()
        await service.removeSeason(season).toPromise();

        expect(seasonsService.mockRemoveSeason).toHaveBeenCalledWith(season);
    });
});
