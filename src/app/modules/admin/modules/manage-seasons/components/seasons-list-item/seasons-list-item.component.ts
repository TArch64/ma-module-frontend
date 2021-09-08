import {Component, Input} from '@angular/core';
import {Season} from "@common/season";

@Component({
  selector: 'app-seasons-list-item',
  templateUrl: './seasons-list-item.component.html',
  styleUrls: ['./seasons-list-item.component.css']
})
export class SeasonsListItemComponent {
    @Input()
    public season!: Season;
}
