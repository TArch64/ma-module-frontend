import {Component, ViewEncapsulation} from '@angular/core';
import {CommonSeasonFacade} from "@common/season/common-season.facade";
import {Season} from "@common/season/entities";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-season-selector',
    templateUrl: './season-selector.component.html',
    styleUrls: ['./season-selector.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SeasonSelectorComponent {
    public readonly selectControl = new FormControl(this.seasonFacade.activeSeason);

    constructor(private seasonFacade: CommonSeasonFacade) {
        this.selectControl.valueChanges.subscribe(season => {
            this.seasonFacade.changeActiveSeason(season);
        });
    }

    public get seasons(): Season[] {
        return this.seasonFacade.seasons;
    }
}
