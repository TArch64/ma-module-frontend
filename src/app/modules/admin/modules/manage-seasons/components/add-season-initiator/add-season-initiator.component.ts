import { Component } from '@angular/core';
import {ManageSeasonsFacade} from "../../manage-seasons.facade";
import {ToastrService} from "@common/toastr";

@Component({
  selector: 'app-add-season-initiator',
  templateUrl: './add-season-initiator.component.html',
  styleUrls: ['./add-season-initiator.component.css']
})
export class AddSeasonInitiatorComponent {
    public isSeasonStarting = false;

    constructor(
        private readonly facade: ManageSeasonsFacade,
        private readonly toastr: ToastrService
    ) {}

    public startSeason(): void {
        this.isSeasonStarting = true;
        this.facade.startSeason().subscribe({
            next: this.onSeasonStarted.bind(this),
            error: this.onStartSeasonError.bind(this)
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
