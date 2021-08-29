import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AdminLayoutComponent, AdminPageComponent} from "./components";
import {LayoutModule} from "@common/layout";
import {CommonSeasonModule} from "@common/season";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: AdminPageComponent,
                children: [
                    {
                        path: 'manage-seasons',
                        loadChildren: () => import('./modules/manage-seasons').then(m => m.ManageSeasonsModule)
                    }
                ]
            }
        ]),
        LayoutModule,
        CommonSeasonModule,
        MatButtonModule
    ],
    declarations: [
        AdminLayoutComponent,
        AdminPageComponent
    ]
})
export class AdminModule {}
