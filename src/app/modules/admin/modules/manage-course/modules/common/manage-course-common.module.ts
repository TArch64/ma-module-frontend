import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {UsersInputComponent} from "./components";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

const publicDeclarations = [
    UsersInputComponent
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatInputModule
    ],
    declarations: publicDeclarations,
    exports: publicDeclarations
})
export class ManageCourseCommonModule {}
