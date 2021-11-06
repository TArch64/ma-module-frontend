import { Component } from '@angular/core';
import {ManageMentorsFacade} from "../../manage-mentors.facade";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-mentors-list',
  templateUrl: './mentors-list.component.html',
  styleUrls: ['./mentors-list.component.css']
})
export class MentorsListComponent {
    public readonly state$ = combineLatest([
        this.facade.leadMentor$,
        this.facade.regularMentors$
    ]).pipe(
        map(([leadMentor, mentors]) => ({leadMentor, mentors}))
    )

    constructor(
        private readonly facade: ManageMentorsFacade
    ) {}
}
