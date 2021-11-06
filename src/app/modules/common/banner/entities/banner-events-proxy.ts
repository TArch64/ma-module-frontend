import { EventEmitter } from '@angular/core';

export class BannerEventsProxy {
    public static create() {
        return new BannerEventsProxy(new EventEmitter<null>());
    }

    private constructor(
        public readonly onClose: EventEmitter<null>
    ) {}

    close() {
        this.onClose.next();
    }
}
