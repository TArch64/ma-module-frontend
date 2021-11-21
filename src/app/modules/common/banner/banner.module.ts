import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PortalModule } from '@angular/cdk/portal';
import { BannerComponent, BannersComponent } from './components';

const publicDeclarations = [
    BannersComponent
];

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        PortalModule
    ],
    declarations: [
        ...publicDeclarations,
        BannerComponent
    ],
    exports: publicDeclarations
})
export class BannerModule {}
