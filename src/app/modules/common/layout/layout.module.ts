import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonAuthModule } from '@common/auth';
import { CommonCoreModule } from '@common/core';
import { LayoutComponent, LayoutContentComponent, LayoutCurrentUserComponent, SidenavLinkComponent } from './components';
import { LayoutFacade } from './layout.facade';
import { MatTabRouterLinkDirective } from './directives';

const publicDeclarations = [
    LayoutComponent,
    LayoutContentComponent,
    SidenavLinkComponent,
    MatTabRouterLinkDirective
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatProgressBarModule,
        MatSidenavModule,
        CommonCoreModule,
        CommonAuthModule
    ],
    declarations: [
        ...publicDeclarations,
        LayoutCurrentUserComponent
    ],
    providers: [
        LayoutFacade
    ],
    exports: publicDeclarations
})
export class LayoutModule {}
