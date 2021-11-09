import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { JoinPageComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: JoinPageComponent }
        ]),
        MatCardModule,
        MatButtonModule
    ],
    declarations: [
        JoinPageComponent
    ]
})
export class JoinModule {}
