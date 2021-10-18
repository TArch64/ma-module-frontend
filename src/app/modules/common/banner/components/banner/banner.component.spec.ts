import {ComponentFixture, TestBed} from "@angular/core/testing";
import {EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BannerEventsProxy, BannerOptions, IBannerEventsProxy} from "../../entities";
import {BannerComponent} from "./banner.component";
import {BannerTypes} from "@common/banner/enums";
import {By} from "@angular/platform-browser";

class MockBannerEventsProxy implements IBannerEventsProxy {
    mockClose = jest.spyOn<IBannerEventsProxy, 'close'>(this, 'close');

    onClose = new EventEmitter<null>();
    onClosed = new EventEmitter<null>();

    close(): Observable<null> {
        return this.onClosed;
    }

    closed(): void {}
}

function createEvents(): MockBannerEventsProxy {
    return new MockBannerEventsProxy();
}

function createComponent(options: BannerOptions, events: IBannerEventsProxy): ComponentFixture<BannerComponent> {
    const module = TestBed.configureTestingModule({
        imports: [
            MatCardModule,
            MatButtonModule,
            MatIconModule
        ],
        providers: [
            {provide: BannerOptions, useValue: options},
            {provide: BannerEventsProxy, useValue: events}
        ],
        declarations: [BannerComponent]
    });
    return module.createComponent(BannerComponent);
}

describe('rendering', () => {
    test('should render close button for closable', () => {
        const options = BannerOptions.create(BannerTypes.WARNING, { title: 'test', closable: true });
        const fixture = createComponent(options, createEvents());
        fixture.detectChanges();

        const closeEl = fixture.debugElement.query(By.css('[data-test-selector="close"]'));
        expect(closeEl).toBeTruthy();
    });

    test('should not render close button for non closable', () => {
        const options = BannerOptions.create(BannerTypes.WARNING, { title: 'test', closable: false });
        const fixture = createComponent(options, createEvents());
        fixture.detectChanges();

        const closeEl = fixture.debugElement.query(By.css('[data-test-selector="close"]'));
        expect(closeEl).toBeFalsy();
    });
});

describe('close', () => {
    test('should close banner', () => {
        const options = BannerOptions.create(BannerTypes.WARNING, { title: 'test', closable: true });
        const events = createEvents();
        const fixture = createComponent(options, events);
        fixture.detectChanges();

        const closeEl = fixture.debugElement.query(By.css('[data-test-selector="close"]'));
        closeEl.triggerEventHandler('click', null);
        expect(events.mockClose).toHaveBeenCalled();
    });
});
