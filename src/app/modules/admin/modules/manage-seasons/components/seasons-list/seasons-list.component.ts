import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ManageSeasonsFacade } from '../../manage-seasons.facade';

@Component({
    selector: 'app-seasons-list',
    templateUrl: './seasons-list.component.html',
    styleUrls: ['./seasons-list.component.css']
})
export class SeasonsListComponent {
    public readonly state$ = combineLatest([
        this.facade.activeSeason$,
        this.facade.inactiveSeasons$
    ]).pipe(
        map(([activeSeason, inactiveSeasons]) => ({
            activeSeason,
            inactiveSeasons
        })
        ));

    constructor(private readonly facade: ManageSeasonsFacade) {}
}
