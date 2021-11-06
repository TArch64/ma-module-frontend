import { Injector } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { BannerComponent } from '../components';
import { BannerOptions } from './banner-options';
import { BannerEventsProxy } from './banner-events-proxy';

export class BannerRef {
    public static create(options: BannerOptions): BannerRef {
        const events = BannerEventsProxy.create();
        const injector = Injector.create({
            providers: [
                { provide: BannerOptions, useValue: options },
                { provide: BannerEventsProxy, useValue: events }
            ]
        });
        const portal = new ComponentPortal(BannerComponent, null, injector);
        return new BannerRef(portal, events);
    }

    private constructor(
        public readonly portal: ComponentPortal<BannerComponent>,
        public readonly events: BannerEventsProxy
    ) {}

    close() {
        this.events.close();
    }
}
