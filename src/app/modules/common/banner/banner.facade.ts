import { Injectable } from '@angular/core';
import { BannersService } from './services';

@Injectable({ providedIn: 'root' })
export class BannerFacade {
    public readonly banners$ = this.bannersService.banners$;

    constructor(private readonly bannersService: BannersService) {}
}
