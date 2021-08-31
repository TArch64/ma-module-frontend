import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CommonAuthModule} from "@common/auth";
import {CommonCoreModule} from "@common/core";
import {ManageCoursesFacade} from "./manage-courses.facade";
import {CoursesEmptyComponent, CoursesListComponent, ManageCoursesPageComponent} from "./components";
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {LayoutModule} from "@common/layout";
import {MatListModule} from "@angular/material/list";
import {ManageCoursesResolver} from "./resolvers/manage-courses.resolver";
import {CoursesRepositoryService} from "./services";
import {CoursesSync} from "./sync";
import {CommonSeasonModule} from "@common/season";
import {MatCardModule} from "@angular/material/card";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                resolve: { state: ManageCoursesResolver },
                component: ManageCoursesPageComponent
            }
        ]),
        CommonCoreModule,
        CommonAuthModule,
        CommonSeasonModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        LayoutModule
    ],
    declarations: [
        ManageCoursesPageComponent,
        CoursesEmptyComponent,
        CoursesListComponent
    ],
    providers: [
        ManageCoursesFacade,
        CoursesRepositoryService,
        CoursesSync,
        ManageCoursesResolver
    ]
})
export class ManageCoursesModule {}
