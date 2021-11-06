import { Injectable } from '@angular/core';
import { CommonSeasonsService } from '@common/season';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminFacade {
    public readonly hasSeasons$ = this.seasonsService.seasons$.pipe(
        map((seasons) => !!seasons.length)
    );

    constructor(private readonly seasonsService: CommonSeasonsService) {}
}
