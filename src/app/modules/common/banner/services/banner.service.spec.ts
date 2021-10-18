import {BannersService} from "./banners.service";
import {IBannerRefFactory} from "./banner-ref.factory";
import {BannerEventsProxy, BannerOptions, IBannerRef} from "../entities";
import {Component, EventEmitter} from "@angular/core";
import {ComponentPortal} from "@angular/cdk/portal";

@Component({
    template: '<div>test</div>'
})
class TestBannerComponent {}

class MockBannerRef implements IBannerRef<TestBannerComponent> {
    events = new BannerEventsProxy(new EventEmitter<null>(), new EventEmitter<null>());
    portal = new ComponentPortal(TestBannerComponent);

    close() {}
}

class MockBannerRefFactory implements IBannerRefFactory<TestBannerComponent> {
    constructor(public mockBannerRef: MockBannerRef) {}

    create(options: BannerOptions): IBannerRef<TestBannerComponent> {
        return this.mockBannerRef;
    }
}

function createRefFactory(): MockBannerRefFactory {
    const bannerRef = new MockBannerRef();
    return new MockBannerRefFactory(bannerRef);
}

function createService(refFactory: IBannerRefFactory<TestBannerComponent>): BannersService<TestBannerComponent> {
    return new BannersService<TestBannerComponent>(refFactory);
}

describe('show', () => {
    test('should add to empty list', () => {
        const service = createService(createRefFactory());

        service.showWarning({ title: 'test' });

        expect(service.bannersSnapshot).toHaveLength(1)
    });
});

describe('close', () => {
    test('should close banner', async () => {
        const service = createService(createRefFactory());
        const ref = service.showWarning({ title: 'test' });

        await ref.events.close().toPromise();

        expect(service.bannersSnapshot).toHaveLength(0)
    });
});
