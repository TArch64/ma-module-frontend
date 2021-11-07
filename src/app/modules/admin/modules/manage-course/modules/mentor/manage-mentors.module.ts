import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonCoreModule } from '@common/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from '@common/toastr';
import { CommonFormModule } from '@common/form';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BannerModule } from '@common/banner';
import { MatListModule } from '@angular/material/list';
import { ManageCourseCommonModule } from '../common';
import { ManageMentorsSync } from './sync';
import { ManageMentorsFacade } from './manage-mentors.facade';
import { MentorsAutocompleteService, ManageMentorsService } from './services';
import {
    AddMentorDialogComponent,
    CourseLeadSelectorComponent,
    ManageMentorsPageComponent,
    ManageMentorsActionsComponent,
    MentorsEmptyComponent,
    MentorsListComponent,
    MentorsListItemComponent
} from './components';

const publicDeclarations = [
    ManageMentorsPageComponent,
    ManageMentorsActionsComponent
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
        CommonCoreModule,
        CommonFormModule,
        ToastrModule,
        BannerModule,
        ManageCourseCommonModule
    ],
    declarations: [
        ...publicDeclarations,
        CourseLeadSelectorComponent,
        MentorsEmptyComponent,
        AddMentorDialogComponent,
        MentorsListComponent,
        MentorsListItemComponent
    ],
    providers: [
        ManageMentorsFacade,
        ManageMentorsSync,
        ManageMentorsService,
        MentorsAutocompleteService
    ],
    exports: publicDeclarations
})
export class ManageMentorsModule {}
