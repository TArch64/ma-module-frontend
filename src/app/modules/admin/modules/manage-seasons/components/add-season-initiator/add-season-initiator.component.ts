import { Component } from '@angular/core';
import {ManageSeasonsFacade} from "../../manage-seasons.facade";
import {ToastrService} from "@common/toastr";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ConfirmResult, ConfirmService} from "@common/confirm";

@Component({
  selector: 'app-add-season-initiator',
  templateUrl: './add-season-initiator.component.html'
})
export class AddSeasonInitiatorComponent {
    public isSeasonStarting = false;

    constructor(
        private readonly facade: ManageSeasonsFacade,
        private readonly toastr: ToastrService,
        private readonly confirm: ConfirmService
    ) {}

    public startSeason(): void {
        this.confirmStarting().pipe(
            switchMap(() => {
                this.isSeasonStarting = true;
                return this.facade.startSeason();
            })
        ).subscribe({
            next: this.onSeasonStarted.bind(this),
            error: this.onStartSeasonError.bind(this)
        });
    }

    private confirmStarting(): Observable<ConfirmResult> {
        return this.confirm.open({
            text: 'Are you sure you want to start new season?',
            confirmAction: { text: 'Start' }
        });
    }

    private onSeasonStarted(): void {
        this.facade.refreshActiveSeason().subscribe(() => {
            this.toastr.show('Season successfully started')
            this.isSeasonStarting = false
        });
    }

    private onStartSeasonError(error: Error): void {
        this.toastr.show(error.message);
        this.isSeasonStarting = false
    }
}
