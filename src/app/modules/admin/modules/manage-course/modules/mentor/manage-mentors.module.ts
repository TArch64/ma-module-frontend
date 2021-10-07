import {NgModule} from "@angular/core";
import {
    AddMentorDialogComponent,
    CourseLeadSelectorComponent,
    ManageMentorsPageComponent,
    MentorsEmptyComponent
} from "./components";
import {MentorsAutocompleteService, ManageMentorsService} from "./services";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {ManageMentorsFacade} from "./manage-mentors.facade";
import {ManageMentorsSync} from "./sync";
import {MatButtonModule} from "@angular/material/button";
import {CommonCoreModule} from "@common/core";
import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule} from "@common/toastr";
import {CommonFormModule} from "@common/form";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ManageCourseCommonModule} from "../common";
import {BannerModule} from "@common/banner";

const publicDeclarations = [
    ManageMentorsPageComponent
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
        AddMentorDialogComponent
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
