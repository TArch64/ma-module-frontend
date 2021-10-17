import {Observable, of, Subject} from "rxjs";
import {By} from "@angular/platform-browser";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {LayoutComponent} from "./layout.component";
import {LayoutCurrentUserComponent} from "../layout-current-user/layout-current-user.component";
import {ILayoutFacade, LayoutFacade} from "@common/layout/layout.facade";

class MockLayoutFacade implements ILayoutFacade {
    mockMobileNavigationSubject = new Subject<null>();

    progressBarVisibility$: Observable<boolean>;
    currentUser$ = of(null);
    isMobileSnapshot: boolean;
    isMobile$: Observable<boolean>;
    mobileNavigation$ = this.mockMobileNavigationSubject.asObservable();

    constructor(
        progressBar: boolean = false,
        isMobile: boolean = false
    ) {
        this.progressBarVisibility$ = of(progressBar);

        this.isMobileSnapshot = isMobile;
        this.isMobile$ = of(isMobile);
    }

    signOut(): void {}
}

function createComponent(facade: ILayoutFacade): ComponentFixture<LayoutComponent> {
    const module = TestBed.configureTestingModule({
        imports: [
            MatSidenavModule,
            MatToolbarModule,
            MatIconModule,
            MatButtonModule,
            MatProgressBarModule,
            RouterTestingModule,
            NoopAnimationsModule
        ],
        declarations: [
            LayoutComponent,
            LayoutCurrentUserComponent
        ],
        providers: [
            {provide: LayoutFacade, useValue: facade}
        ]
    });
    module.overrideComponent(LayoutCurrentUserComponent, {
        set: {template: '<div></div>'}
    })
    return module.createComponent(LayoutComponent);
}

describe('progress bar', () => {
    test('should show progress bar', () => {
        const facade = new MockLayoutFacade(true);
        const fixture = createComponent(facade);
        fixture.detectChanges();

        const progressBarEl = fixture.debugElement.query(By.css('mat-progress-bar'));

        expect(progressBarEl).toBeTruthy();
    });

    test('should hide progress bar', () => {
        const facade = new MockLayoutFacade(false);
        const fixture = createComponent(facade);
        fixture.detectChanges();

        const progressBarEl = fixture.debugElement.query(By.css('mat-progress-bar'));

        expect(progressBarEl).toBeFalsy()
    });
});

describe('sidenav', () => {
    test('should use initial desktop open state', () => {
        const facade = new MockLayoutFacade(true, false);
        const fixture = createComponent(facade);
        fixture.detectChanges();

        const matSidenav = fixture.debugElement.query(By.css('mat-sidenav'));

        expect(matSidenav.componentInstance.opened).toBeTruthy();
    });

    test('should use initial mobile open state', () => {
        const facade = new MockLayoutFacade(true, true);
        const fixture = createComponent(facade);
        fixture.detectChanges();

        const matSidenav = fixture.debugElement.query(By.css('mat-sidenav'));

        expect(matSidenav.componentInstance.opened).toBeFalsy();
    });

    test('should use initial desktop behavior', () => {
        const facade = new MockLayoutFacade(true, false);
        const fixture = createComponent(facade);
        fixture.detectChanges();

        const matSidenav = fixture.debugElement.query(By.css('mat-sidenav'));

        expect(matSidenav.componentInstance.mode).toEqual(LayoutComponent.SIDENAV_DESKTOP_BEHAVIOR)
    });

    test('should use initial mobile behavior', async () => {
        const facade = new MockLayoutFacade(true, true);
        const fixture = createComponent(facade);
        fixture.detectChanges();

        const matSidenav = fixture.debugElement.query(By.css('mat-sidenav'));

        expect(matSidenav.componentInstance.mode).toEqual(LayoutComponent.SIDENAV_MOBILE_BEHAVIOR)
    });

    test('should open sidenav', () => {
        const fixture = createComponent(new MockLayoutFacade());
        fixture.componentInstance.isSidenavOpened = false;
        fixture.detectChanges();

        const matSidenav = fixture.debugElement.query(By.css('[data-test-selector="toggleSidenav"]'));
        matSidenav.triggerEventHandler('click', null);

        expect(fixture.componentInstance.isSidenavOpened).toBeTruthy();
    });


    test('should close sidenav by menu button', () => {
        const fixture = createComponent(new MockLayoutFacade());
        fixture.componentInstance.isSidenavOpened = true;
        fixture.detectChanges();

        const matSidenav = fixture.debugElement.query(By.css('[data-test-selector="toggleSidenav"]'));
        matSidenav.triggerEventHandler('click', null);

        expect(fixture.componentInstance.isSidenavOpened).toBeFalsy();
    });

    test('should close sidenav by close button', () => {
        const fixture = createComponent(new MockLayoutFacade());
        fixture.componentInstance.isSidenavOpened = true;
        fixture.detectChanges();

        const matSidenav = fixture.debugElement.query(By.css('[data-test-selector="closeSidenav"]'));
        matSidenav.triggerEventHandler('click', null);

        expect(fixture.componentInstance.isSidenavOpened).toBeFalsy();
    });

    test('should close sidenav after navigation on mobile', () => {
        const facade = new MockLayoutFacade();
        const fixture = createComponent(facade);
        fixture.componentInstance.isSidenavOpened = true;
        fixture.detectChanges();

        facade.mockMobileNavigationSubject.next();

        expect(fixture.componentInstance.isSidenavOpened).toBeFalsy();
    });
});
