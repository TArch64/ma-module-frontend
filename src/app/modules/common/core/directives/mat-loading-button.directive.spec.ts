import {Component, Input, ViewChild} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {By} from "@angular/platform-browser";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ButtonLoaderComponent} from "../components";
import {MatLoadingButtonDirective} from "./mat-loading-button.directive";

@Component({
    template: `<button
        mat-button
        [appMatLoadingButton]="isLoading"
        [disabled]="originalDisabled"
        #matButton
    >
        Test
    </button>`,
    entryComponents: [ButtonLoaderComponent]
})
class TestComponent {
    @Input()
    public isLoading: boolean = false;

    @Input()
    public originalDisabled: boolean = false;

    @ViewChild('matButton')
    public matButton!: MatButton;
}

function createComponent(): ComponentFixture<TestComponent> {
    const module = TestBed.configureTestingModule({
        imports: [MatButtonModule, MatProgressSpinnerModule],
        declarations: [MatLoadingButtonDirective, TestComponent, ButtonLoaderComponent]
    });
    return module.createComponent(TestComponent);
}

describe('rendering', () => {
    test('should disable while loading', () => {
        const fixture = createComponent();
        fixture.componentInstance.isLoading = true;
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('[mat-button]'))

        expect(buttonEl.attributes.disabled).toBeTruthy();
    });

    test('should render correct initial disabled', () => {
        const fixture = createComponent();
        fixture.componentInstance.originalDisabled = true;
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('[mat-button]'))

        expect(buttonEl.attributes.disabled).toBeTruthy();
    });

    test('should render correct initial disabled after loading end', () => {
        const fixture = createComponent();
        fixture.componentInstance.isLoading = true;
        fixture.componentInstance.originalDisabled = true;
        fixture.detectChanges();

        fixture.componentInstance.isLoading = false;
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('[mat-button]'))

        expect(buttonEl.attributes.disabled).toBeTruthy();
    });

    test('should render spinner', () => {
        const fixture = createComponent();
        fixture.componentInstance.isLoading = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('mat-spinner')).toBeTruthy();
    });

    test('should hide spinner', async () => {
        const fixture = createComponent();
        fixture.componentInstance.isLoading = true;
        fixture.detectChanges();

        fixture.componentInstance.isLoading = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('mat-spinner')).toBeFalsy();
    });
});

