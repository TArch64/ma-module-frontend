import {EventEmitter} from "@angular/core";
import {Observable} from "rxjs";

export interface IBannerEventsProxy {
    onClose: EventEmitter<null>;
    onClosed: EventEmitter<null>;
    close(): Observable<null>;
    closed(): void;
}

export class BannerEventsProxy implements IBannerEventsProxy {
    constructor(
        public readonly onClose: EventEmitter<null>,
        public readonly onClosed: EventEmitter<null>
    ) {}

    close(): Observable<null> {
        this.onClose.next();
        return this.onClosed;
    }

    closed(): void {
        this.onClose.complete();
        this.onClosed.next();
        this.onClosed.complete();
    }
}
