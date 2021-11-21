import { Component } from '@angular/core';
import { MentorFacade } from '../../mentor.facade';

@Component({
    selector: 'app-mentor-page',
    templateUrl: './mentor-page.component.html'
})
export class MentorPageComponent {
    public readonly hasSeasons$ = this.facade.hasSeasons$;

    constructor(private readonly facade: MentorFacade) {}
}
