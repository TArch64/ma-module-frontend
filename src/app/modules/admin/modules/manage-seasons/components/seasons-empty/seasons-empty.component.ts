import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-seasons-empty',
    templateUrl: './seasons-empty.component.html'
})
export class SeasonsEmptyComponent {
    @Input()
    public isAdding!: boolean;

    @Output()
    public readonly onAddSeason = new EventEmitter();

    public addSeason(): void {
        this.onAddSeason.next();
    }
}
