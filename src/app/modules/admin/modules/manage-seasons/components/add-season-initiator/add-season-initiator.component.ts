import { Component } from '@angular/core';

@Component({
  selector: 'app-add-season-initiator',
  templateUrl: './add-season-initiator.component.html',
  styleUrls: ['./add-season-initiator.component.css']
})
export class AddSeasonInitiatorComponent {
    public isSeasonStarting = false;

    startSeason() {
        this.isSeasonStarting = true;
        setTimeout(() => this.isSeasonStarting = false, 3000);
    }
}
