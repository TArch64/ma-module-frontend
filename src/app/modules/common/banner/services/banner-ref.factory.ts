import {EventEmitter, Injectable, Injector} from "@angular/core";
import {ComponentPortal} from "@angular/cdk/portal";
import {BannerComponent} from "@common/banner/components";
import {BannerEventsProxy, IBannerEventsProxy, BannerOptions, BannerRef, IBannerRef} from "../entities";

export interface IBannerRefFactory<T> {
    create(options: BannerOptions): IBannerRef<T>;
}

@Injectable()
export class BannerRefFactory implements IBannerRefFactory<BannerComponent> {
    public create(options: BannerOptions): IBannerRef<BannerComponent> {
        const events = this.createEventsProxy();
        const injector = this.createInjector(options, events);
        const portal = new ComponentPortal(BannerComponent, null, injector);
        return new BannerRef(portal, events)
    }

    private createInjector(options: BannerOptions, events: IBannerEventsProxy): Injector {
        return Injector.create({
            providers: [
                { provide: BannerOptions, useValue: options },
                { provide: BannerEventsProxy, useValue: events }
            ]
        });
    }

    private createEventsProxy(): IBannerEventsProxy {
        return new BannerEventsProxy(new EventEmitter<null>(), new EventEmitter<null>());
    }
}
