import {Observable, of, Subject} from "rxjs";
import {FormControlDirective, ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {CommonSeasonFacade, ICommonSeasonFacade} from "../../common-season.facade";
import {ISeasonJSON, Season} from "../../entities";
import {SeasonSelectorComponent} from './season-selector.component';

class MockCommonSeasonFacade implements ICommonSeasonFacade {
    public mockCurrentSeasonSubject = new Subject<Season | null>();
    public readonly mockChangeCurrentSeason = jest.spyOn<ICommonSeasonFacade, 'changeCurrentSeason'>(this, 'changeCurrentSeason');

    public readonly seasons$ = of(this.seasons);
    public readonly currentSeason$ = this.mockCurrentSeasonSubject.asObservable();
    public readonly isSeasonsLoaded: boolean = true;

    constructor(
        private readonly seasons: Season[]
    ) {}

    loadSeasons(): Observable<Season[]> {
        return of([]);
    }

    changeCurrentSeason(season: Season): void {
        this.mockCurrentSeasonSubject.next(season);
    }
}

function createFacade(seasons: Season[]): MockCommonSeasonFacade {
    return new MockCommonSeasonFacade(seasons);
}

function createComponent(facade: ICommonSeasonFacade): ComponentFixture<SeasonSelectorComponent> {
    const module = TestBed.configureTestingModule({
        imports: [
            MatFormFieldModule,
            MatSelectModule,
            ReactiveFormsModule,
            NoopAnimationsModule
        ],
        declarations: [SeasonSelectorComponent],
        providers: [
            {
                provide: CommonSeasonFacade,
                useValue: facade
            }
        ]
    });
    return module.createComponent(SeasonSelectorComponent);
}

function createSeason(attrs: Partial<ISeasonJSON> = {}): Season {
    return Season.fromJSON({
        id: 'test',
        value: 1,
        active: true,
        year: 2021,
        ...attrs
    });
}

describe('sync selected value', () => {
    test('should change value on ui if current changed', async () => {
        const season = createSeason({ id: 'test 1' });
        const current = createSeason({ id: 'test 2' });
        const facade = createFacade([
            season,
            current,
            createSeason({ id: 'test 3' }),
            createSeason({ id: 'test 4' }),
        ]);
        const fixture = createComponent(facade);

        facade.mockCurrentSeasonSubject.next(season);
        fixture.detectChanges();

        const matSelect = fixture.debugElement.query(By.css('mat-select'));

        expect(matSelect.componentInstance.value).toEqual(season);
    });

    test('should change current after selector changes', () => {
        const season = createSeason({ id: 'test 1' });
        const current = createSeason({ id: 'test 2' });
        const facade = createFacade([
            season,
            current,
            createSeason({ id: 'test 3' }),
            createSeason({ id: 'test 4' }),
        ]);

        const fixture = createComponent(facade);
        fixture.componentInstance.selectControl.setValue(current);
        fixture.detectChanges();

        const matSelect = fixture.debugElement.query(By.css('mat-select'));
        const matSelectControl = matSelect.injector.get(FormControlDirective);
        matSelectControl.control.setValue(season);

        expect(facade.mockChangeCurrentSeason).toHaveBeenCalledWith(season)
    });
});
