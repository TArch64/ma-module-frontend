import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonFormModule } from '@common/form';
import { CommonCoreModule } from '@common/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ManageCourseCommonModule } from '../common';
import { AddStudentsDialogComponent, ManageStudentsActionsComponent, ManageStudentsPageComponent } from './components';

const publicDeclarations = [
    ManageStudentsPageComponent,
    ManageStudentsActionsComponent,
    AddStudentsDialogComponent
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ManageCourseCommonModule,
        CommonFormModule,
        CommonCoreModule
    ],
    declarations: publicDeclarations
})
export class ManageStudentsModule {}
