import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {CommonAuthSyncService} from "./sync";
import {AuthOnlyGuard, InauthOnlyGuard, RoleAccessGuard} from "./guards";
import {AuthInterceptor} from "./interceptors";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        CommonAuthSyncService,
        AuthOnlyGuard,
        InauthOnlyGuard,
        AuthInterceptor,
        RoleAccessGuard
    ]
})
export class CommonAuthModule {}
