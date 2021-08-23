import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AdminLayoutComponent, AdminPageComponent} from "./components";
import {LayoutModule} from "@common/layout";
import {CommonSeasonModule} from "@common/season";
import {MatButtonModule} from "@angular/material/button";
import {ManageSeasonsModule, ManageSeasonsPageComponent} from "./modules";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: AdminPageComponent,
                children: [
                    { path: 'manage-seasons', component: ManageSeasonsPageComponent }
                ]
            }
        ]),
        LayoutModule,
        CommonSeasonModule,
        MatButtonModule,
        ManageSeasonsModule
    ],
    declarations: [
        AdminLayoutComponent,
        AdminPageComponent
    ]
})
export class AdminModule {}
