import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutModule} from "@common/layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ManageCourseFacade} from "./manage-course.facade";
import {RouterModule} from "@angular/router";
import {ManageCoursePageComponent} from "./components";
import {LoadCourseResolver} from "./resolvers";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: ':courseId',
                component: ManageCoursePageComponent,
                data: { course: LoadCourseResolver }
            }
        ]),
        LayoutModule,
        MatToolbarModule
    ],
    declarations: [
        ManageCoursePageComponent
    ],
    providers: [
        ManageCourseFacade,
        LoadCourseResolver
    ]
})
export class ManageCourseModule {}
