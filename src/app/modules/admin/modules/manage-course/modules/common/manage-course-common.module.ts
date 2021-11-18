import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { ToastrModule } from '@common/toastr';
import { ConfirmModule } from '@common/confirm';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { PendingCourseInvitationComponent, UsersInputComponent } from './components';

const publicDeclarations = [
    UsersInputComponent,
    PendingCourseInvitationComponent
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatInputModule,
        MatListModule,
        MatTooltipModule,
        MatButtonModule,
        ToastrModule,
        ConfirmModule
    ],
    declarations: publicDeclarations,
    exports: publicDeclarations
})
export class ManageCourseCommonModule {}
