import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageCourseCommonModule } from '../common';
import { ManageStudentsPageComponent } from './components';

const publicDeclarations = [
    ManageStudentsPageComponent
];

@NgModule({
    imports: [
        CommonModule,
        ManageCourseCommonModule
    ],
    declarations: publicDeclarations
})
export class ManageStudentsModule {}
