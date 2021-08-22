import { Component } from '@angular/core';
import {CommonSeasonsService} from "@common/season";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  constructor(public readonly seasonsService: CommonSeasonsService) { }
}
