import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BindControlErrorDirective, BindFormErrorsDirective, ProcessingFormDirective } from './directives';

const publicDeclarations = [
    BindFormErrorsDirective,
    BindControlErrorDirective,
    ProcessingFormDirective
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: publicDeclarations,
    exports: [
        ...publicDeclarations,
        ReactiveFormsModule
    ]
})
export class CommonFormModule {}
