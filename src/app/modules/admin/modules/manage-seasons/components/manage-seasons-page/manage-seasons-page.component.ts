import { Component } from '@angular/core';
import {ManageSeasonsFacade} from "../../manage-seasons.facade";
import {ToastrService} from "@common/toastr";
import {ProgressBarService} from "@common/layout";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-seasons-page',
  templateUrl: './manage-seasons-page.component.html'
})
export class ManageSeasonsPageComponent {
    public isSeasonAdding: boolean = false;
    public readonly hasSeasons$ = this.facade.hasSeasons$;

    constructor(
        private readonly facade: ManageSeasonsFacade,
        private readonly toastr: ToastrService,
        private readonly progressBar: ProgressBarService,
        private readonly router: Router
    ) {}

    public addSeason(makeActive: boolean): void {
        this.progressBar.show();
        this.isSeasonAdding = true;

        this.facade.addSeason(makeActive).subscribe({
            next: this.onSeasonAdded.bind(this),
            error: this.onSeasonAddingError.bind(this)
        });
    }

    private onSeasonAdded(): void {
        this.progressBar.hide();
        this.isSeasonAdding = false;
        this.router.navigate(['/admin', 'courses'])
    }

    private onSeasonAddingError(error: Error): void {
        this.progressBar.hide();
        this.isSeasonAdding = false;
        this.toastr.show(error.message);
    }
}
