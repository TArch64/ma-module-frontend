import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {MatTabsModule, MatTabLink} from "@angular/material/tabs";
import {MatTabRouterLinkDirective} from './mat-tab-router-link.directive';
import {By} from "@angular/platform-browser";

@Component({
    template: '<div></div>'
})
class RouteComponent {}

@Component({
    template: `
        <nav mat-tab-nav-bar>
            <a mat-tab-link routerLinkActive appMatTabRouterLink routerLink="/"></a>
        </nav>
    `
})
class TestComponent {}

function createComponent(): ComponentFixture<TestComponent> {
    const module = TestBed.configureTestingModule({
        imports: [
            MatTabsModule,
            RouterTestingModule.withRoutes([
                { path: '', component: RouteComponent },
                { path: 'new', component: RouteComponent }
            ], {
                initialNavigation: 'enabledBlocking'
            })
        ],
        declarations: [
            TestComponent,
            RouteComponent,
            MatTabRouterLinkDirective
        ]
    });
    return module.createComponent(TestComponent);
}

describe('sync tab active', () => {
    test('should render active status', async () => {
        const fixture = createComponent();
        fixture.detectChanges();

        const router = fixture.componentRef.injector.get(Router);
        await router.navigate(['/']);
        fixture.detectChanges();

        const link = fixture.debugElement.query(By.css('[mat-tab-link]'));
        expect(link.injector.get(MatTabLink).active).toBeTruthy();
    });
});
