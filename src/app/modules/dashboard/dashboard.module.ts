import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DashboardPageComponent} from "./components";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: DashboardPageComponent}
        ])
    ]
})
export class DashboardModule {}
