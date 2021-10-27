import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CoursesGuard} from "./courses.guard";
import {AdminFacade, IAdminFacade} from "../admin.facade";
import {Observable, of} from "rxjs";
import {ISeasonJSON, Season} from "@common/season";

class MockAdminFacade implements IAdminFacade {
    static create(): MockAdminFacade {
        return new MockAdminFacade();
    }

    readonly mockLoadSeasons = jest.spyOn<IAdminFacade, 'loadSeasons'>(this, 'loadSeasons');

    hasSeasons$ = of(true);

    loadSeasons(): Observable<Season[]> {
        return of([]);
    }
}

function createGuard(facade: IAdminFacade): CoursesGuard {
    const module = TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [
            CoursesGuard,
            {provide: AdminFacade, useValue: facade}
        ]
    });
    return module.inject(CoursesGuard);
}

const createSeasonJson = (attrs: Partial<ISeasonJSON> = {}): ISeasonJSON => ({
    id: 'test',
    value: 1,
    active: false,
    year: 2021,
    ...attrs
});

function createSeason(): Season {
    return Season.fromJSON(createSeasonJson());
}

describe('can activate', () => {
    test('should redirect if no seasons', async () => {
        const facade = MockAdminFacade.create();
        const guard = createGuard(facade);

        facade.mockLoadSeasons.mockReturnValue(of([]));
        const result = await guard.canActivate().toPromise();

        expect(result.toString()).toEqual('/admin/seasons');
    });

    test('should proceed if there are seasons', async () => {
        const facade = MockAdminFacade.create();
        const guard = createGuard(facade);

        facade.mockLoadSeasons.mockReturnValue(of([createSeason()]));
        const result = await guard.canActivate().toPromise();

        expect(result).toEqual(true);
    });
});
