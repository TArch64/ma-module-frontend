import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentPageComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: StudentPageComponent }
        ])
    ],
    declarations: [
        StudentPageComponent
    ]
})
export class StudentModule {}
