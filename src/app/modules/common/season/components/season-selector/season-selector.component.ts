import {Component, Inject, OnDestroy} from '@angular/core';
import {CommonSeasonFacade, ICommonSeasonFacade} from "../../common-season.facade";
import {Season} from "@common/season";
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

    constructor(
        @Inject(CommonSeasonFacade)
        private readonly seasonFacade: ICommonSeasonFacade
    ) {
        this.disposable.subscribeTo(this.selectControl.valueChanges, (season: Season) => {
            this.seasonFacade.changeCurrentSeason(season)
        });
        this.disposable.subscribeTo(this.seasonFacade.currentSeason$, (season: Season | null) => {
            this.selectControl.setValue(season, { emitEvent: false });
        });
    }

    public ngOnDestroy() {
        this.disposable.dispose();
    }
}
