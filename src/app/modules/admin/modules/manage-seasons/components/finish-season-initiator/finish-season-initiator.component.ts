import { Component } from '@angular/core';
import {ManageSeasonsFacade} from "../../manage-seasons.facade";
import {ToastrService} from "@common/toastr";

@Component({
  selector: 'app-finish-season-initiator',
  templateUrl: './finish-season-initiator.component.html',
  styleUrls: ['./finish-season-initiator.component.css']
})
export class FinishSeasonInitiatorComponent {
    public readonly activeSeasonTitle: string = this.getActiveSeasonTitle();
    public isSeasonFinishing: boolean = false;

    constructor(
        private readonly facade: ManageSeasonsFacade,
        private readonly toastr: ToastrService
    ) {}

    private getActiveSeasonTitle(): string {
        const activeSeason = this.facade.activeSeason!;
        return `${activeSeason.value}th - ${activeSeason.year}`;
    }

    public finishSeason(): void {
        this.isSeasonFinishing = true;
        this.facade.finishSeason().subscribe({
            next: this.onSeasonFinished.bind(this),
            error: this.onFinishSeasonError.bind(this)
        })
    }

    private onSeasonFinished(): void {
        this.facade.refreshActiveSeason().subscribe(() => {
            this.toastr.show('Season successfully started')
            this.isSeasonFinishing = false
        });
    }

    private onFinishSeasonError(error: Error): void {
        this.toastr.show(error.message);
        this.isSeasonFinishing = false
    }
}
