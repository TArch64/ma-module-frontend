import { Component } from '@angular/core';
import {AdminFacade} from "../../admin.facade";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
    public readonly hasSeasons$ = this.facade.hasSeasons$;

    constructor(private readonly facade: AdminFacade) {}
}
