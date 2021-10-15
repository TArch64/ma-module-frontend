import {Component, Input, ViewChild} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatMenuOverlayClassDirective} from "./mat-menu-overlay-class.directive";
import {MatMenu, MatMenuModule} from "@angular/material/menu";

const TEST_CLASS = 'test-class';

@Component({
    template: `<mat-menu [appMatMenuOverlayClass]="testClass" #matMenu></mat-menu>`
})
class TestComponent {
    @ViewChild('matMenu')
    public matMenu!: MatMenu;

    @Input()
    public testClass!: string;
}

function createComponent(): ComponentFixture<TestComponent> {
    const module = TestBed.configureTestingModule({
        imports: [MatMenuModule],
        declarations: [MatMenuOverlayClassDirective, TestComponent]
    });
    return module.createComponent(TestComponent);
}

describe('mat menu overlay class', () => {
    test('should render overlay class', () => {
        const fixture = createComponent();
        fixture.componentInstance.testClass = TEST_CLASS;
        fixture.detectChanges();

        expect(fixture.componentInstance.matMenu.overlayPanelClass).toEqual(TEST_CLASS);
    });

    test('should update class after changes', () => {
        const fixture = createComponent();
        fixture.componentInstance.testClass = 'old-class';
        fixture.detectChanges();

        fixture.componentInstance.testClass = TEST_CLASS;
        fixture.detectChanges();

        expect(fixture.componentInstance.matMenu.overlayPanelClass).toEqual(TEST_CLASS);
    });
});

