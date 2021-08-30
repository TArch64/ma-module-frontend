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
    public readonly selectControl = new FormControl();
    public readonly seasons$ = this.seasonFacade.seasons$;

    constructor(private seasonFacade: CommonSeasonFacade) {
        this.disposable.subscribeTo(this.selectControl.valueChanges, (season: Season) => {
            this.seasonFacade.changeActiveSeason(season)
        });
        this.disposable.subscribeTo(this.seasonFacade.activeSeason$, (season: Season | null) => {
            this.selectControl.setValue(season, { emitEvent: false });
        })
    }

    public ngOnDestroy() {
        this.disposable.dispose();
    }
}
