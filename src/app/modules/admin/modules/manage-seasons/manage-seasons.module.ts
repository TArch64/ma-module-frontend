import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {CommonCoreModule} from "@common/core";
import {CommonAuthModule} from "@common/auth";
import {ManageSeasonsPageComponent, AddSeasonInitiatorComponent, FinishSeasonInitiatorComponent} from "./components";
import {ManageSeasonsResolver} from "./resolvers";
import {ManageSeasonsFacade} from "./manage-seasons.facade";
import {ActiveSeasonService} from "./services";
import {SeasonManagerSync} from "./sync";
import {ToastrModule} from "@common/toastr";
import {ConfirmModule} from "@common/confirm";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LayoutModule} from "@common/layout";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ManageSeasonsPageComponent,
                resolve: { state: ManageSeasonsResolver }
            }
        ]),
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        CommonCoreModule,
        CommonAuthModule,
        ToastrModule,
        ConfirmModule,
        LayoutModule,
    ],
    declarations: [
        ManageSeasonsPageComponent,
        AddSeasonInitiatorComponent,
        FinishSeasonInitiatorComponent
    ],
    providers: [
        ManageSeasonsFacade,
        ActiveSeasonService,
        SeasonManagerSync,
        ManageSeasonsResolver
    ]
})
export class ManageSeasonsModule {}
