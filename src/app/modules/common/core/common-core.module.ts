import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CommonAuthService} from "@common/auth";
import {ApiPathService, SerializerService} from "./services";
import {SquareComponent} from "./components";
import {RoleTitlePipe} from "./pipes";
import {MatMenuOverlayClass} from "./directives";

const publicDeclarations = [
    SquareComponent,
    RoleTitlePipe,
    MatMenuOverlayClass
]

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        SerializerService,
        ApiPathService
    ],
    declarations: publicDeclarations,
    exports: publicDeclarations
})
export class CommonCoreModule {
    constructor(authService: CommonAuthService, apiPathService: ApiPathService) {
        // Use setter injection to avoid circular dependency
        apiPathService.setAuthService(authService);
    }
}
