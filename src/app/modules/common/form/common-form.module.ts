import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {BindControlErrorDirective, BindFormErrorsDirective} from "./directives";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        BindFormErrorsDirective,
        BindControlErrorDirective
    ],
    exports: [
        ReactiveFormsModule,
        BindFormErrorsDirective,
        BindControlErrorDirective
    ]
})
export class CommonFormModule {}
