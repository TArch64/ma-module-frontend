import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ManageMentorsFacade } from '../../manage-mentors.facade';

@Component({
    selector: 'app-mentors-list',
    templateUrl: './mentors-list.component.html',
    styleUrls: ['./mentors-list.component.css']
})
export class MentorsListComponent {
    public readonly state$ = combineLatest({
        leadMentor: this.facade.leadMentor$,
        mentors: this.facade.regularMentors$
    });

    constructor(
        private readonly facade: ManageMentorsFacade
    ) {}
}
