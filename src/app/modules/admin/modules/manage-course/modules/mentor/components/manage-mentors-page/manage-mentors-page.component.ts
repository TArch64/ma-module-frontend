import {Component, OnDestroy} from '@angular/core';
import {ManageMentorsFacade} from "../../manage-mentors.facade";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {AddMentorDialogComponent} from "../add-mentor-dialog";
import {DialogSizes} from "@common/dialog";
import {Disposable} from "@common/core";
import {BannersService} from "@common/banner/services";
import {BannerRef} from "@common/banner";
import {Mentor} from "@common/course";

@Component({
  selector: 'app-manage-mentors-page',
  templateUrl: './manage-mentors-page.component.html'
})
export class ManageMentorsPageComponent implements OnDestroy {
    public readonly hasMentors$ = this.facade.mentors$.pipe(
        map(mentors => !!mentors.length)
    );
    private readonly disposable = new Disposable();
    private noLeadWarningRef: BannerRef | null = null;

    constructor(
        private readonly facade: ManageMentorsFacade,
        private readonly banners: BannersService,
        private readonly matDialog: MatDialog
    ) {
        this.disposable.subscribeTo(this.facade.leadMentor$, this.onLeadChanged.bind(this));
    }

    public ngOnDestroy() {
        this.disposable.dispose();
        this.closeLeadWarning();
    }

    private onLeadChanged(lead: Mentor | null): void {
        this.closeLeadWarning();
        if (lead) return;

        this.noLeadWarningRef = this.banners.showWarning({
            title: 'There are no lead mentor for this course',
            closable: false
        });
    }

    private closeLeadWarning(): void {
        this.noLeadWarningRef?.close();
        this.noLeadWarningRef = null;
    }

    public addMentor(): void {
        this.matDialog.open(AddMentorDialogComponent, {width: DialogSizes.MD})
    }
}
