import {Observable, of} from "rxjs";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {CommonSeasonModule, Season, SeasonSelectorComponent} from "@common/season";
import {LayoutModule} from "@common/layout";
import {AdminFacade, IAdminFacade} from "../../admin.facade";
import {AdminLayoutComponent} from "./admin-layout.component";


class MockAdminFacade implements IAdminFacade {
    static create(): MockAdminFacade {
        return new MockAdminFacade();
    }

    hasSeasons$ = of(true);

    loadSeasons(): Observable<Season[]> {
        return of([]);
    }
}

function createComponent(facade: IAdminFacade): ComponentFixture<AdminLayoutComponent> {
    const module = TestBed.configureTestingModule({
        imports: [
            LayoutModule,
            RouterTestingModule,
            NoopAnimationsModule,
            CommonSeasonModule
        ],
        providers: [
            {provide: AdminFacade, useValue: facade}
        ],
        declarations: [AdminLayoutComponent]
    });
    module.overrideComponent(SeasonSelectorComponent, {
        set: {template: '<div></div>'}
    })
    return module.createComponent(AdminLayoutComponent);
}

describe('rendering', () => {
    test('should render season selector if there are seasons', () => {
        const facade = MockAdminFacade.create();
        facade.hasSeasons$ = of(true);

        const fixture = createComponent(facade);
        fixture.detectChanges();

        const selector = fixture.debugElement.query(By.css('app-season-selector'))
        expect(selector).toBeTruthy();
    });

    test('should not render season selector if no seasons', () => {
        const facade = MockAdminFacade.create();
        facade.hasSeasons$ = of(false);

        const fixture = createComponent(facade);
        fixture.detectChanges();

        const selector = fixture.debugElement.query(By.css('app-season-selector'))
        expect(selector).toBeFalsy();
    });
});
