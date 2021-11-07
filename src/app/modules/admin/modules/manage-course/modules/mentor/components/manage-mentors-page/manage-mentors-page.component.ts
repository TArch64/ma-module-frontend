import { Component, Injector, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Disposable } from '@common/core';
import { BannersService } from '@common/banner/services';
import { BannerRef } from '@common/banner';
import { Mentor } from '@common/course';
import { AddMentorDialogComponent } from '../add-mentor-dialog';
import { ManageMentorsFacade } from '../../manage-mentors.facade';
import { DynamicToolbarService } from '../../../../services';
import { ManageMentorsActionsComponent } from '../manage-mentors-actions';

@Component({
    selector: 'app-manage-mentors-page',
    templateUrl: './manage-mentors-page.component.html'
})
export class ManageMentorsPageComponent implements OnDestroy {
    public readonly hasMentors$ = this.facade.mentors$.pipe(
        map((mentors) => !!mentors.length)
    );

    private readonly disposable = new Disposable();
    private noLeadWarningRef: BannerRef | null = null;

    constructor(
        private readonly facade: ManageMentorsFacade,
        private readonly banners: BannersService,
        private readonly matDialog: MatDialog,
        private readonly dynamicToolbarService: DynamicToolbarService,
        private readonly injector: Injector
    ) {
        this.disposable.subscribeTo(this.facade.leadMentor$, this.onLeadChanged.bind(this));
        this.dynamicToolbarService.useToolbar(ManageMentorsActionsComponent, this.injector);
    }

    public ngOnDestroy() {
        this.disposable.dispose();
        this.closeLeadWarning();
        this.dynamicToolbarService.removeToolbar();
    }

    private onLeadChanged(lead: Mentor | null): void {
        if (lead) {
            this.closeLeadWarning();
            return;
        }

        if (this.noLeadWarningRef) return;

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
        this.matDialog.open(AddMentorDialogComponent, AddMentorDialogComponent.DIALOG_CONFIG);
    }
}
