import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AdminPageComponent} from "./components";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: AdminPageComponent }
        ])
    ],
    declarations: [
        AdminPageComponent
    ]
})
export class AdminModule {}
