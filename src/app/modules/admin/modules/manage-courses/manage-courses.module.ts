import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CommonAuthModule} from "@common/auth";
import {CommonCoreModule} from "@common/core";
import {ManageCoursesFacade} from "./manage-courses.facade";
import {
    AddCourseDialogComponent,
    CoursesEmptyComponent,
    CoursesListComponent,
    ManageCoursesPageComponent
} from "./components";
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
import {MatDialogModule} from "@angular/material/dialog";
import {CommonFormModule} from "@common/form";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ToastrModule} from "@common/toastr";

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
        CommonFormModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        LayoutModule,
        ToastrModule
    ],
    declarations: [
        ManageCoursesPageComponent,
        CoursesEmptyComponent,
        CoursesListComponent,
        AddCourseDialogComponent
    ],
    providers: [
        ManageCoursesFacade,
        CoursesRepositoryService,
        CoursesSync,
        ManageCoursesResolver
    ]
})
export class ManageCoursesModule {}
