import {Observable, of} from "rxjs";
import {ICommonSeasonSync} from "../../sync";
import {ISeasonJSON, Season} from "../../entities";
import {CommonSeasonsService} from '../common-seasons.service';

class MockCommonSeasonSync implements ICommonSeasonSync {
    constructor(private readonly seasons: ISeasonJSON[]) {}

    loadSeasons(): Observable<ISeasonJSON[]> {
        return of(this.seasons);
    }
}

function createService(seasons: ISeasonJSON[]): CommonSeasonsService {
    return new CommonSeasonsService(new MockCommonSeasonSync(seasons));
}

const createSeasonJSON = (attrs: Partial<ISeasonJSON> = {}): ISeasonJSON => ({
    id: 'test',
    value: 1,
    active: false,
    year: 2021,
    ...attrs
});

function getSeasonById(service: CommonSeasonsService, id: string): Season | null {
    return service.seasonsSnapshot.find(season => season.id === id) ?? null;
}

describe('load seasons', () => {
    test('should not detect current if there are no seasons', async () => {
        const service = createService([]);
        await service.loadSeasons().toPromise();

        expect(service.currentSeasonSnapshot).toBeFalsy();
    });

    test('should use active seasons as current', async () => {
        const ACTIVE_SEASON_ID = 'test 2';
        const service = createService([
            createSeasonJSON({ id: 'test 1', active: false }),
            createSeasonJSON({ id: ACTIVE_SEASON_ID, active: true }),
            createSeasonJSON({ id: 'test 3', active: false })
        ]);
        await service.loadSeasons().toPromise();
        expect(service.currentSeasonSnapshot?.id).toEqual(ACTIVE_SEASON_ID);
    });

    test('should use last seasons as current', async () => {
        const ACTIVE_SEASON_ID = 'test 2';
        const service = createService([
            createSeasonJSON({ id: 'test 1', value: 1 }),
            createSeasonJSON({ id: ACTIVE_SEASON_ID, value: 2 })
        ]);
        await service.loadSeasons().toPromise();
        expect(service.currentSeasonSnapshot?.id).toEqual(ACTIVE_SEASON_ID);
    });
});

describe('add season', () => {
    test('should use as current unless any', async () => {
        const service = createService([]);
        await service.loadSeasons();

        const season = Season.fromJSON(createSeasonJSON());
        service.addSeason(season);

        expect(service.seasonsSnapshot).toHaveLength(1);
        expect(service.currentSeasonSnapshot).toEqual(season);
    });

    test('should use as current if no any and the newest', async () => {
        const service = createService([
            createSeasonJSON({ id: 'test 1', value: 1 })
        ]);
        await service.loadSeasons().toPromise();

        const season = Season.fromJSON(createSeasonJSON({ id: 'test 2', value: 2 }));
        service.addSeason(season);

        expect(service.seasonsSnapshot).toHaveLength(2);
        expect(service.currentSeasonSnapshot).toEqual(season);
    });

    test('should not change current if has active', async () => {
        const ACTIVE_SEASON_ID = 'test 1';
        const service = createService([
            createSeasonJSON({ id: ACTIVE_SEASON_ID, active: true })
        ]);
        await service.loadSeasons().toPromise();

        const season = Season.fromJSON(createSeasonJSON({ id: 'test 2', active: false }));
        service.addSeason(season);

        expect(service.seasonsSnapshot).toHaveLength(2);
        expect(service.currentSeasonSnapshot?.id).toEqual(ACTIVE_SEASON_ID);
    });
});

describe('remove season', () => {
    test('should change current to the latest after removing current', async () => {
        const LATEST_SEASON_ID = 'test 1';
        const service = createService([
            createSeasonJSON({ id: LATEST_SEASON_ID, value: 1, active: false }),
            createSeasonJSON({ id: 'test 2', value: 2, active: true })
        ]);
        await service.loadSeasons().toPromise();

        service.removeSeason(service.activeSeason!);

        expect(service.seasonsSnapshot).toHaveLength(1);
        expect(service.currentSeasonSnapshot?.id).toEqual(LATEST_SEASON_ID);
    });

    test('should not change current if removing not current', async () => {
        const CURRENT_SEASON_ID = 'test 1';
        const REMOVING_SEASON_ID = 'test 2'
        const service = createService([
            createSeasonJSON({ id: CURRENT_SEASON_ID, value: 1, active: true }),
            createSeasonJSON({ id: REMOVING_SEASON_ID, value: 2, active: false })
        ]);
        await service.loadSeasons().toPromise();

        service.removeSeason(getSeasonById(service, REMOVING_SEASON_ID)!);

        expect(service.seasonsSnapshot).toHaveLength(1);
        expect(service.currentSeasonSnapshot?.id).toEqual(CURRENT_SEASON_ID);
    });
});
