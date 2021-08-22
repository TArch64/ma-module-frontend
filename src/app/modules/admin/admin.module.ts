import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AdminLayoutComponent, AdminPageComponent} from "./components";
import {LayoutModule} from "@common/layout";
import {CommonSeasonModule} from "@common/season";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: AdminPageComponent }
        ]),
        LayoutModule,
        CommonSeasonModule
    ],
    declarations: [
        AdminLayoutComponent,
        AdminPageComponent
    ]
})
export class AdminModule {}
