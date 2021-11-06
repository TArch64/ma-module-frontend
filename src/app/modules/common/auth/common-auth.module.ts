import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {CommonAuthSyncService} from "./sync";
import {AuthOnlyGuard, InauthOnlyGuard, RoleAccessGuard} from "./guards";
import {AuthInterceptor} from "./interceptors";
import {CommonAuthFacade} from "./common-auth.facade";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        CommonAuthFacade,
        CommonAuthSyncService,
        AuthOnlyGuard,
        InauthOnlyGuard,
        AuthInterceptor.getProvider(),
        RoleAccessGuard
    ]
})
export class CommonAuthModule {}
