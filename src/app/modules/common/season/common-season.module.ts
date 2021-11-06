import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommonCoreModule } from '@common/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonSeasonSyncService } from './sync';
import { LoadSeasonsResolver } from './resolvers';
import { SeasonSelectorComponent } from './components';
import { CommonSeasonFacade } from './common-season.facade';

const publicDeclarations = [
    SeasonSelectorComponent
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        CommonCoreModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        ReactiveFormsModule
    ],
    declarations: publicDeclarations,
    exports: publicDeclarations,
    providers: [
        CommonSeasonFacade,
        CommonSeasonSyncService,
        LoadSeasonsResolver
    ]
})
export class CommonSeasonModule {}
