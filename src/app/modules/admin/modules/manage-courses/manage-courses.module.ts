import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CommonAuthModule} from "@common/auth";
import {CommonCoreModule} from "@common/core";
import {ManageCoursesFacade} from "./manage-courses.facade";
import {ManageCoursesPageComponent} from "./components";
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {LayoutModule} from "@common/layout";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ManageCoursesPageComponent
            }
        ]),
        CommonCoreModule,
        CommonAuthModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        LayoutModule
    ],
    declarations: [
        ManageCoursesPageComponent
    ],
    providers: [
        ManageCoursesFacade
    ]
})
export class ManageCoursesModule {}
