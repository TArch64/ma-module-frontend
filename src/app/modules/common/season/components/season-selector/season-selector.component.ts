import { Component, OnDestroy } from '@angular/core';
import { CommonSeasonFacade } from '@common/season/common-season.facade';
import { Season } from '@common/season';
import { FormControl } from '@angular/forms';
import { Disposable } from '@common/core';

@Component({
    selector: 'app-season-selector',
    templateUrl: './season-selector.component.html'
})
export class SeasonSelectorComponent implements OnDestroy {
    private readonly disposable = new Disposable();
    public readonly selectControl = new FormControl();
    public readonly seasons$ = this.seasonFacade.seasons$;

    constructor(private readonly seasonFacade: CommonSeasonFacade) {
        this.disposable.subscribeTo(this.selectControl.valueChanges, (season: Season): void => {
            this.seasonFacade.changeCurrentSeason(season);
        });
        this.disposable.subscribeTo(this.seasonFacade.currentSeason$, (season: Season | null): void => {
            this.selectControl.setValue(season, { emitEvent: false });
        });
    }

    public ngOnDestroy(): void {
        this.disposable.dispose();
    }
}
