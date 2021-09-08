import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfirmResult, ConfirmService} from "@common/confirm";
import {Observable} from "rxjs";

@Component({
  selector: 'app-manage-seasons-toolbar',
  templateUrl: './manage-seasons-toolbar.component.html'
})
export class ManageSeasonsToolbarComponent {
    @Input()
    public isAdding!: boolean;

    @Output()
    public readonly onAddSeason = new EventEmitter<boolean>();

    constructor(
        private readonly confirm: ConfirmService
    ) {}

    public addSeason(): void {
        this.confirmAdding().subscribe((result) => {
            this.onAddSeason.next(result.additionalAction!.value);
        });
    }

    private confirmAdding(): Observable<ConfirmResult> {
        return this.confirm.open({
            text: 'Are you sure you want to add new season?',
            confirmAction: { text: 'Add' },
            additionalAction: { text: 'Do you want to make it active?' }
        });
    }
}
