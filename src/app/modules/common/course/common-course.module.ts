import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommonAuthModule } from '@common/auth';
import { CommonCoreModule } from '@common/core';
import { CommonSeasonModule } from '@common/season';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        CommonCoreModule,
        CommonAuthModule,
        CommonSeasonModule
    ]
})
export class CommonCourseModule {}
