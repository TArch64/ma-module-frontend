import {Component, OnDestroy} from '@angular/core';
import {CommonSeasonFacade} from "@common/season/common-season.facade";
import {Season} from "@common/season/entities";
import {FormControl} from "@angular/forms";
import {Disposable} from "@common/core";

@Component({
    selector: 'app-season-selector',
    templateUrl: './season-selector.component.html'
})
export class SeasonSelectorComponent implements OnDestroy {
    private readonly disposable = new Disposable();
    public readonly selectControl = new FormControl(this.seasonFacade.activeSeason);

    constructor(private seasonFacade: CommonSeasonFacade) {
        this.disposable.subscribeTo(this.selectControl.valueChanges, (season: Season) => {
            this.seasonFacade.changeActiveSeason(season)
        });
    }

    public ngOnDestroy() {
        this.disposable.dispose();
    }

    public get seasons(): Season[] {
        return this.seasonFacade.seasons;
    }
}
