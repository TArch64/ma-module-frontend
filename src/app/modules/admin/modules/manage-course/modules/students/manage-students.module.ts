import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ManageCourseCommonModule } from '../common';
import { ManageStudentsActionsComponent, ManageStudentsPageComponent } from './components';

const publicDeclarations = [
    ManageStudentsPageComponent,
    ManageStudentsActionsComponent
];

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        ManageCourseCommonModule
    ],
    declarations: publicDeclarations
})
export class ManageStudentsModule {}
