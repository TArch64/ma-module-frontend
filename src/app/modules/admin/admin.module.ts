import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AdminPageComponent} from "./components";
import {LayoutModule} from "@common/layout";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: AdminPageComponent }
        ]),
        LayoutModule
    ],
    declarations: [
        AdminPageComponent
    ]
})
export class AdminModule {}
