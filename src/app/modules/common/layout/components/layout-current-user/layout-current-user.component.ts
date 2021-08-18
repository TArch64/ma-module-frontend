import { Component } from '@angular/core';
import {LayoutFacade} from "@common/layout/layout.facade";

@Component({
  selector: 'app-layout-current-user',
  templateUrl: './layout-current-user.component.html',
  styleUrls: ['./layout-current-user.component.css']
})
export class LayoutCurrentUserComponent {
    public readonly user$ = this.layoutFacade.currentUser$;

    constructor(private readonly layoutFacade: LayoutFacade) {}

    public signOut(): void {
        this.layoutFacade.signOut();
    }
}
