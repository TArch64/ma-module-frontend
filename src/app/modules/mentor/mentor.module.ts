import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MentorPageComponent} from "./components";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: MentorPageComponent }
        ])
    ],
    declarations: [
        MentorPageComponent
    ]
})
export class MentorModule {}
