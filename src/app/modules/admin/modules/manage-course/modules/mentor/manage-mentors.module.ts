import {NgModule} from "@angular/core";
import {CourseLeadSelectorComponent, ManageMentorsPageComponent} from "./components";
import {ManageMentorsService} from "./services";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {ManageMentorsFacade} from "./manage-mentors.facade";

const publicDeclarations = [
    ManageMentorsPageComponent
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    declarations: [
        ...publicDeclarations,
        CourseLeadSelectorComponent
    ],
    providers: [
        ManageMentorsFacade,
        ManageMentorsService
    ],
    exports: publicDeclarations
})
export class ManageMentorsModule {}
