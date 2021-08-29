import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CommonCoreModule} from "@common/core";
import {ManageSeasonsPageComponent, AddSeasonInitiatorComponent, FinishActiveSeasonInitiatorComponent} from "./components";
import {ManageSeasonsResolver} from "./resolvers";
import {ManageSeasonsFacade} from "./manage-seasons.facade";
import {ActiveSeasonService} from "./services";
import {SeasonManagerSync} from "./sync";
import {AuthInterceptor} from "@common/auth";
import {HttpClientModule} from "@angular/common/http";

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
        MatButtonModule,
        MatIconModule,
        CommonCoreModule,
        HttpClientModule
    ],
    declarations: [
        ManageSeasonsPageComponent,
        AddSeasonInitiatorComponent,
        FinishActiveSeasonInitiatorComponent
    ],
    providers: [
        ManageSeasonsFacade,
        ActiveSeasonService,
        SeasonManagerSync,
        ManageSeasonsResolver,
        AuthInterceptor.getProvider()
    ]
})
export class ManageSeasonsModule {}
