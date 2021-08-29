import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {ManageSeasonsFacade} from "../../manage-seasons.facade";

@Component({
  selector: 'app-manage-seasons-page',
  templateUrl: './manage-seasons-page.component.html',
  styleUrls: ['./manage-seasons-page.component.css']
})
export class ManageSeasonsPageComponent {
    public readonly isAnySeasonActive: Observable<boolean> = this.facade.isAnySeasonActive$;

    constructor(private readonly facade: ManageSeasonsFacade) {}
}
