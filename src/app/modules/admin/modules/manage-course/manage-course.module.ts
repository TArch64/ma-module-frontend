import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutModule} from "@common/layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ManageCourseFacade} from "./manage-course.facade";
import {RouterModule} from "@angular/router";
import {ManageCoursePageComponent, ManageMentorsPageComponent, ManageStudentsPageComponent} from "./components";
import {LoadCourseResolver} from "./resolvers";
import {CourseService} from "./services";
import {ManageCourseSync} from "./sync";
import {CommonCoreModule} from "@common/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonAuthModule} from "@common/auth";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ManageCoursePageComponent,
                resolve: { course: LoadCourseResolver },
                children: [
                    {
                        path: 'mentors',
                        component: ManageMentorsPageComponent
                    },
                    {
                        path: 'students',
                        component: ManageStudentsPageComponent
                    },
                    {
                        path: '',
                        redirectTo: 'mentors'
                    }
                ]
            }
        ]),
        HttpClientModule,
        LayoutModule,
        CommonAuthModule,
        CommonCoreModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule
    ],
    declarations: [
        ManageCoursePageComponent,
        ManageMentorsPageComponent,
        ManageStudentsPageComponent
    ],
    providers: [
        ManageCourseFacade,
        CourseService,
        ManageCourseSync,
        LoadCourseResolver
    ]
})
export class ManageCourseModule {}
