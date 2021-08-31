import { Component } from '@angular/core';
import {ManageSeasonsFacade} from "../../manage-seasons.facade";
import {ToastrService} from "@common/toastr";
import {Observable} from "rxjs";
import {ConfirmResult, ConfirmService} from "@common/confirm";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-finish-season-initiator',
  templateUrl: './finish-season-initiator.component.html'
})
export class FinishSeasonInitiatorComponent {
    public readonly activeSeasonTitle: string = this.getActiveSeasonTitle();
    public isSeasonFinishing: boolean = false;

    constructor(
        private readonly facade: ManageSeasonsFacade,
        private readonly toastr: ToastrService,
        private readonly confirm: ConfirmService
    ) {}

    private getActiveSeasonTitle(): string {
        const activeSeason = this.facade.activeSeason!;
        return `${activeSeason.value}th - ${activeSeason.year}`;
    }

    public finishSeason(): void {
        this.confirmFinishing().pipe(
            switchMap(() => {
                this.isSeasonFinishing = true;
                return this.facade.finishSeason();
            })
        ).subscribe({
            next: this.onSeasonFinished.bind(this),
            error: this.onFinishSeasonError.bind(this)
        });
    }

    private confirmFinishing(): Observable<ConfirmResult> {
        return this.confirm.open({
            text: 'Are you sure you want to finish current season?',
            confirmAction: { text: 'Finish' }
        });
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
