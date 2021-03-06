import { Injectable } from '@angular/core';
import { CommonSeasonsService } from '@common/season';

@Injectable({ providedIn: 'root' })
export class AdminFacade {
    public readonly hasSeasons$ = this.seasonsService.hasSeasons$;

    constructor(private readonly seasonsService: CommonSeasonsService) {}
}
