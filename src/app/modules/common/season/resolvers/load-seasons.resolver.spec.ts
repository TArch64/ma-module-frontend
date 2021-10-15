import {Observable, of} from "rxjs";
import {Season} from "../entities";
import {ICommonSeasonFacade} from "../common-season.facade";
import {LoadSeasonsResolver} from './load-seasons.resolver';

class MockCommonSeasonFacade implements ICommonSeasonFacade {
    public readonly seasons$ = of([]);
    public readonly currentSeason$ = of(null);

    public readonly mockLoadSeasons = jest.spyOn<ICommonSeasonFacade, 'loadSeasons'>(this, 'loadSeasons');

    constructor(public readonly isSeasonsLoaded: boolean) {}

    loadSeasons(): Observable<Season[]> {
        return of([]);
    }

    changeCurrentSeason(season: Season): void {}
}

function createFacade(isSeasonsLoaded: boolean): MockCommonSeasonFacade {
    return new MockCommonSeasonFacade(isSeasonsLoaded);
}

function createResolver(isSeasonsLoaded: boolean) {
    const facade = createFacade(isSeasonsLoaded);
    const resolver = new LoadSeasonsResolver(facade);
    return { facade, resolver };
}

describe('resolve', () => {
    test('should not load seasons if loaded', async () => {
        const {facade, resolver} = createResolver(true);

        await resolver.resolve().toPromise();

        expect(facade.mockLoadSeasons).not.toHaveBeenCalled();
    });

    test('should load seasons if no loaded', async () => {
        const {facade, resolver} = createResolver(false);

        await resolver.resolve().toPromise();

        expect(facade.mockLoadSeasons).toHaveBeenCalled();
    });
});
