import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonAuthModule } from '@common/auth';
import { CommonCoreModule } from '@common/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@common/layout';
import { MatListModule } from '@angular/material/list';
import { CommonSeasonModule } from '@common/season';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonFormModule } from '@common/form';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrModule } from '@common/toastr';
import { CommonCourseModule } from '@common/course';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmModule } from '@common/confirm';
import { ManageCoursesResolver } from './resolvers';
import {
    AddCourseDialogComponent,
    CoursesEmptyComponent,
    CoursesListComponent,
    CoursesListItemComponent,
    ManageCoursesPageComponent
} from './components';

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
        CommonCourseModule,
        ConfirmModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatIconModule,
        LayoutModule,
        ToastrModule
    ],
    declarations: [
        ManageCoursesPageComponent,
        CoursesEmptyComponent,
        CoursesListComponent,
        CoursesListItemComponent,
        AddCourseDialogComponent
    ]
})
export class ManageCoursesModule {}
