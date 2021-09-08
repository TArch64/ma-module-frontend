import {Component} from '@angular/core';
import {ManageSeasonsFacade} from "../../manage-seasons.facade";

@Component({
    selector: 'app-seasons-list',
    templateUrl: './seasons-list.component.html',
    styleUrls: ['./seasons-list.component.css']
})
export class SeasonsListComponent {
    public readonly activeSeason$ = this.facade.activeSeason$;
    public readonly inactiveSeasons$ = this.facade.inactiveSeasons$;

    constructor(private readonly facade: ManageSeasonsFacade) {}
}
