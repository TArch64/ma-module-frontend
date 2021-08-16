import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {CommonAuthSyncService} from "./sync";
import {AuthOnlyGuard, InauthOnlyGuard} from "./guards";
import {ActualizeCurrentUserResolver} from "./resolvers";
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
        ActualizeCurrentUserResolver,
        AuthInterceptor
    ]
})
export class CommonAuthModule {}
