import {Component} from '@angular/core';
import {BannerFacade} from "@common/banner/banner.facade";

@Component({
    selector: 'app-banners',
    templateUrl: './banners.component.html',
    styleUrls: ['./banners.component.css']
})
export class BannersComponent {
    public readonly banners$ = this.facade.banners$;

    constructor(private readonly facade: BannerFacade) {}
}
