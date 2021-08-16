import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ApiPathService, SerializerService} from "./services";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        SerializerService,
        ApiPathService
    ]
})
export class CommonCoreModule {}
