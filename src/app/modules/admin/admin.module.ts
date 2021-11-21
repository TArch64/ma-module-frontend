import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@common/layout';
import { CommonSeasonModule } from '@common/season';
import { MatButtonModule } from '@angular/material/button';
import { AdminLayoutComponent, AdminPageComponent } from './components';
import { CoursesGuard } from './guards';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: AdminPageComponent,
                children: [
                    {
                        path: 'seasons',
                        loadChildren: () => import('./modules/manage-seasons').then((m) => m.ManageSeasonsModule)
                    },
                    {
                        path: 'courses/:courseId',
                        loadChildren: () => import('./modules/manage-course').then((m) => m.ManageCourseModule)
                    },
                    {
                        path: 'courses',
                        canActivate: [CoursesGuard],
                        loadChildren: () => import('./modules/manage-courses').then((m) => m.ManageCoursesModule)
                    },
                    {
                        path: '',
                        redirectTo: 'courses'
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
