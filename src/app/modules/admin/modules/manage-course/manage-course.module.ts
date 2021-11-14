import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@common/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommonCoreModule } from '@common/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonAuthModule } from '@common/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { PortalModule } from '@angular/cdk/portal';
import { ManageCourseSync } from './sync';
import { ManageCourseService } from './services';
import { LoadCourseResolver } from './resolvers';
import { ManageCoursePageComponent } from './components';
import { ManageCourseFacade } from './manage-course.facade';
import { ManageMentorsModule, ManageMentorsPageComponent, ManageStudentsModule, ManageStudentsPageComponent } from './modules';

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
        MatTabsModule,
        PortalModule,
        ManageMentorsModule,
        ManageStudentsModule
    ],
    declarations: [
        ManageCoursePageComponent
    ],
    providers: [
        ManageCourseFacade,
        ManageCourseService,
        ManageCourseSync,
        LoadCourseResolver
    ]
})
export class ManageCourseModule {}
