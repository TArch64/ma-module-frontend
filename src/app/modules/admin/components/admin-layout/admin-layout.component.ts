import {Component, Inject} from '@angular/core';
import {AdminFacade, IAdminFacade} from "../../admin.facade";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
    public readonly hasSeasons$ = this.facade.hasSeasons$;

    constructor(
        @Inject(AdminFacade)
        private readonly facade: IAdminFacade
    ) {}
}
