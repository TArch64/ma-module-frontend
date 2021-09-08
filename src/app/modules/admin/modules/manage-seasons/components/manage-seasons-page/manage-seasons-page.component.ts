import { Component } from '@angular/core';
import {ManageSeasonsFacade} from "../../manage-seasons.facade";
import {ToastrService} from "@common/toastr";

@Component({
  selector: 'app-manage-seasons-page',
  templateUrl: './manage-seasons-page.component.html'
})
export class ManageSeasonsPageComponent {
    public isSeasonAdding: boolean = false;
    public readonly hasSeasons$ = this.facade.hasSeasons$;

    constructor(
        private readonly facade: ManageSeasonsFacade,
        private readonly toastr: ToastrService
    ) {}

    public addSeason(makeActive: boolean): void {
        this.isSeasonAdding = true;

        this.facade.addSeason(makeActive).subscribe({
            next: this.onSeasonAdded.bind(this),
            error: this.onSeasonAddingError.bind(this)
        });
    }

    private onSeasonAdded(): void {
        this.isSeasonAdding = false;
    }

    private onSeasonAddingError(error: Error): void {
        this.isSeasonAdding = false;
        this.toastr.show(error.message);
    }
}
