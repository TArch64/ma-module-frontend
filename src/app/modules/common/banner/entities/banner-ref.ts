import {ComponentPortal} from "@angular/cdk/portal";
import {BannerComponent} from "../components";
import {IBannerEventsProxy} from "./banner-events-proxy";

export interface IBannerRef<T> {
    portal: ComponentPortal<T>;
    events: IBannerEventsProxy;
    close(): void;
}

export class BannerRef<C = BannerComponent> implements IBannerRef<C> {
    constructor(
        public readonly portal: ComponentPortal<C>,
        public readonly events: IBannerEventsProxy
    ) {}

    close(): void {
        this.events.close();
    }
}
