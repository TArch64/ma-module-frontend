import {Component, Inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {ILayoutFacade, LayoutFacade} from "@common/layout/layout.facade";
import {MatMenu} from "@angular/material/menu";

@Component({
    selector: 'app-layout-current-user',
    templateUrl: './layout-current-user.component.html',
    styleUrls: ['./layout-current-user.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutCurrentUserComponent {
    public readonly user$ = this.layoutFacade.currentUser$;

    @ViewChild('userMenu')
    private matMenu!: MatMenu

    constructor(
        @Inject(LayoutFacade)
        private readonly layoutFacade: ILayoutFacade
    ) {}

    public signOut(): void {
        this.layoutFacade.signOut();
    }
}
