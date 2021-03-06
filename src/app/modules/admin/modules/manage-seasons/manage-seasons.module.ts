import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CommonCoreModule } from '@common/core';
import { CommonAuthModule } from '@common/auth';
import { ToastrModule } from '@common/toastr';
import { ConfirmModule } from '@common/confirm';
import { LayoutModule } from '@common/layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    ManageSeasonsPageComponent,
    SeasonsListComponent,
    SeasonsListItemComponent,
    SeasonsEmptyComponent,
    ManageSeasonsToolbarComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ManageSeasonsPageComponent
            }
        ]),
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        MatListModule,
        MatTooltipModule,
        CommonCoreModule,
        CommonAuthModule,
        ToastrModule,
        ConfirmModule,
        LayoutModule
    ],
    declarations: [
        ManageSeasonsPageComponent,
        ManageSeasonsToolbarComponent,
        SeasonsListComponent,
        SeasonsListItemComponent,
        SeasonsEmptyComponent
    ]
})
export class ManageSeasonsModule {}
