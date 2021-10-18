import {BehaviorSubject} from "rxjs";
import {Inject, Injectable, OnDestroy} from "@angular/core";
import {Disposable} from "@common/core";
import {BannerOptions, IBannerOptions, IBannerRef} from "../entities";
import {BannerTypes} from "../enums";
import {BannerComponent} from "../components";
import {BannerRefFactory, IBannerRefFactory} from "./banner-ref.factory";

@Injectable()
export class BannersService<C = BannerComponent> implements OnDestroy {
    private readonly disposable = new Disposable();
    private readonly bannersSubject = new BehaviorSubject<IBannerRef<C>[]>([]);
    public readonly banners$ = this.bannersSubject.asObservable();

    constructor(
        @Inject(BannerRefFactory)
        private readonly bannerRefFactory: IBannerRefFactory<C>
    ) {}

    public get bannersSnapshot(): IBannerRef<C>[] {
        return this.bannersSubject.value;
    }

    public ngOnDestroy() {
        this.disposable.dispose();
    }

    public showWarning(options: IBannerOptions): IBannerRef<C> {
        return this.show(BannerOptions.create(BannerTypes.WARNING, options));
    }

    private show(options: BannerOptions): IBannerRef<C> {
        const ref = this.bannerRefFactory.create(options);
        this.disposable.subscribeTo(ref.events.onClose, () => this.removeBanner(ref))
        this.addBanner(ref);
        return ref;
    }

    private addBanner(bannerRef: IBannerRef<C>): void {
        this.bannersSubject.next([bannerRef, ...this.bannersSubject.value]);
    }

    private removeBanner(bannerRef: IBannerRef<C>): void {
        const banners = this.bannersSubject.value.filter(ref => ref !== bannerRef);
        this.bannersSubject.next(banners);
        bannerRef.events.closed();
    }
}
