import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-mentors-empty',
  templateUrl: './mentors-empty.component.html'
})
export class MentorsEmptyComponent {
    @Output()
    public onAddMentor = new EventEmitter()

    public addMentor(): void {
        this.onAddMentor.emit();
    }
}
