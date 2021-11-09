import { Component } from '@angular/core';
import { JoinFacade } from '../../join.facade';

@Component({
    selector: 'app-join-page',
    templateUrl: './join-page.component.html'
})
export class JoinPageComponent {
    public readonly isAccepted = this.facade.invitation.isAccepted;

    constructor(private readonly facade: JoinFacade) {}
}
