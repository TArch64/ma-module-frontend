import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@common/layout';
import { CommonSeasonModule } from '@common/season';
import { MentorPageComponent } from './components';
import { LoadCoursesResolver } from './resolvers';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: MentorPageComponent,
                resolve: { courses: LoadCoursesResolver }
            }
        ]),
        LayoutModule,
        CommonSeasonModule
    ],
    declarations: [
        MentorPageComponent
    ]
})
export class MentorModule {}
