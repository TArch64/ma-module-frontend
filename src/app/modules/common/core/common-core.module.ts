import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ApiPathService, SerializerService} from "./services";
import {SquareComponent} from "./components";
import {RoleTitlePipe} from "./pipes";

const publicDeclarations = [
    SquareComponent,
    RoleTitlePipe
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
export class CommonCoreModule {}
