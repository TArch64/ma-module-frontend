import { EventEmitter } from '@angular/core';

export class BannerEventsProxy {
    public static create(): BannerEventsProxy {
        return new BannerEventsProxy(new EventEmitter<null>());
    }

    private constructor(
        public readonly onClose: EventEmitter<null>
    ) {}

    public close(): void {
        this.onClose.next(null);
    }
}
