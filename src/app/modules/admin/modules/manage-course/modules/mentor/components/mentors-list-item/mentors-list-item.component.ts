import {Component, Input} from '@angular/core';
import {Mentor} from "@common/course";

@Component({
  selector: 'app-mentors-list-item',
  templateUrl: './mentors-list-item.component.html'
})
export class MentorsListItemComponent {
    @Input()
    public mentor!: Mentor;
}
