import { Injectable, OnDestroy } from '@angular/core';
import { Disposable } from '@common/core';
import { BehaviorSubject } from 'rxjs';
import { BannerOptions, BannerRef, IBannerOptions } from '../entities';
import { BannerTypes } from '../enums';

@Injectable()
export class BannersService implements OnDestroy {
    private readonly disposable = new Disposable();
    private readonly bannersSubject = new BehaviorSubject<BannerRef[]>([]);
    public readonly banners$ = this.bannersSubject.asObservable();

    public ngOnDestroy(): void {
        this.disposable.dispose();
    }

    public showWarning(options: IBannerOptions): BannerRef {
        return this.show(BannerOptions.create(BannerTypes.WARNING, options));
    }

    private show(options: BannerOptions): BannerRef {
        const ref = BannerRef.create(options);
        this.disposable.subscribeTo(ref.events.onClose, (): void => this.removeBanner(ref));
        this.addBanner(ref);
        return ref;
    }

    private addBanner(bannerRef: BannerRef): void {
        this.bannersSubject.next([bannerRef, ...this.bannersSubject.value]);
    }

    private removeBanner(bannerRef: BannerRef): void {
        const banners = this.bannersSubject.value.filter((ref): boolean => ref !== bannerRef);
        this.bannersSubject.next(banners);
    }
}
