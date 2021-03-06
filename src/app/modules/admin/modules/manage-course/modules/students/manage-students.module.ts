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
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { ManageCourseCommonModule } from '../common';
import {
    AddStudentsDialogComponent,
    ManageStudentsActionsComponent,
    ManageStudentsPageComponent,
    StudentsEmptyComponent,
    StudentsListComponent,
    StudentsListItemComponent
} from './components';

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
        MatDividerModule,
        MatListModule,
        MatTooltipModule,
        MatIconModule,
        ManageCourseCommonModule,
        CommonFormModule,
        CommonCoreModule
    ],
    declarations: [
        ...publicDeclarations,
        StudentsEmptyComponent,
        StudentsListComponent,
        StudentsListItemComponent
    ]
})
export class ManageStudentsModule {}
