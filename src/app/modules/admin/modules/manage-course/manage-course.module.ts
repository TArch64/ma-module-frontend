import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutModule} from "@common/layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ManageCourseFacade} from "./manage-course.facade";
import {RouterModule} from "@angular/router";
import {ManageCoursePageComponent} from "./components";
import {LoadCourseResolver} from "./resolvers";
import {CourseService} from "./services";
import {ManageCourseSync} from "./sync";
import {CommonCoreModule} from "@common/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonAuthModule} from "@common/auth";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ManageCoursePageComponent,
                resolve: { course: LoadCourseResolver }
            }
        ]),
        HttpClientModule,
        LayoutModule,
        CommonAuthModule,
        CommonCoreModule,
        MatToolbarModule
    ],
    declarations: [
        ManageCoursePageComponent
    ],
    providers: [
        ManageCourseFacade,
        CourseService,
        ManageCourseSync,
        LoadCourseResolver
    ]
})
export class ManageCourseModule {}
