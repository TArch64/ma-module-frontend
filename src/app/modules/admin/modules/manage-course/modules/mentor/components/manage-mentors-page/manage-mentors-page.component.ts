import { Component } from '@angular/core';
import {ManageMentorsFacade} from "../../manage-mentors.facade";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {AddMentorDialogComponent} from "../add-mentor-dialog";
import {DialogSizes} from "@common/dialog";

@Component({
  selector: 'app-manage-mentors-page',
  templateUrl: './manage-mentors-page.component.html'
})
export class ManageMentorsPageComponent {
    public readonly hasMentors$ = this.facade.mentors$.pipe(
        map(mentors => !!mentors.length)
    );

    constructor(
        private readonly facade: ManageMentorsFacade,
        private readonly matDialog: MatDialog
    ) {}

    public addMentor(): void {
        this.matDialog.open(AddMentorDialogComponent, {width: DialogSizes.MD})
    }
}
