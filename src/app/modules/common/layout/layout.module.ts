import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {CommonAuthModule} from "@common/auth";
import {CommonCoreModule} from "@common/core";
import {LayoutComponent, LayoutCurrentUserComponent} from "./components";
import {LayoutFacade} from "./layout.facade";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        CommonCoreModule,
        CommonAuthModule
    ],
    declarations: [
        LayoutComponent,
        LayoutCurrentUserComponent
    ],
    providers: [
        LayoutFacade
    ],
    exports: [
        LayoutComponent
    ]
})
export class LayoutModule {}
