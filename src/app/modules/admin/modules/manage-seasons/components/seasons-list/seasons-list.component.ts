import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ManageSeasonsFacade } from '../../manage-seasons.facade';

@Component({
    selector: 'app-seasons-list',
    templateUrl: './seasons-list.component.html',
    styleUrls: ['./seasons-list.component.css']
})
export class SeasonsListComponent {
    public readonly state$ = combineLatest({
        activeSeason: this.facade.activeSeason$,
        inactiveSeasons: this.facade.inactiveSeasons$
    });

    constructor(private readonly facade: ManageSeasonsFacade) {}
}
