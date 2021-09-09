import {Component, Input} from '@angular/core';
import {Season} from "@common/season";
import {Observable} from "rxjs";
import {ConfirmResult, ConfirmService} from "@common/confirm";
import {ManageSeasonsFacade} from "../../manage-seasons.facade";
import {switchMap} from "rxjs/operators";
import {ToastrService} from "@common/toastr";
import {ProgressBarService} from "@common/layout";

@Component({
  selector: 'app-seasons-list-item',
  templateUrl: './seasons-list-item.component.html',
  styleUrls: ['./seasons-list-item.component.css']
})
export class SeasonsListItemComponent {
    @Input()
    public season!: Season;

    constructor(
        private readonly confirm: ConfirmService,
        private readonly progressBar: ProgressBarService,
        private readonly toastr: ToastrService,
        private readonly facade: ManageSeasonsFacade
    ) {}

    public deactivateSeason(): void {
        this.progressBar.show();

        this.confirmDeactivatingSeason().pipe(
            switchMap(() => this.facade.deactivateSeason(this.season))
        ).subscribe({
            next: () => this.onActionSuccess('made inactive'),
            error: this.onActionFailed.bind(this)
        });
    }

    private confirmDeactivatingSeason(): Observable<ConfirmResult> {
        return this.confirm.open({
            text: 'Are you sure you want to make season inactive?'
        });
    }

    public activateSeason(): void {
        this.progressBar.show();

        this.confirmActivatingSeason().pipe(
            switchMap(() => this.facade.activateSeason(this.season))
        ).subscribe({
            next: () => this.onActionSuccess('made active'),
            error: this.onActionFailed.bind(this)
        });
    }

    private confirmActivatingSeason(): Observable<ConfirmResult> {
        return this.confirm.open({
            text: 'Are you sure you want to make season active?'
        });
    }

    public removeSeason(): void {
        this.progressBar.show();

        this.confirmRemovingSeason().pipe(
            switchMap(() => this.facade.removeSeason(this.season))
        ).subscribe({
            next: () => this.onActionSuccess('removed'),
            error: this.onActionFailed.bind(this)
        });
    }

    private confirmRemovingSeason(): Observable<ConfirmResult> {
        return this.confirm.open({
            text: 'Are you sure you want to remove season?'
        });
    }

    private onActionSuccess(actionTitle: string): void {
        this.progressBar.hide();
        this.toastr.show(`Season successfully ${actionTitle}`);
    }

    private onActionFailed(error: Error): void {
        this.progressBar.hide();
        this.toastr.show(error.message);
    }
}
