import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ToastrService} from "./services";

@NgModule({
    imports: [
        CommonModule,
        MatSnackBarModule
    ],
    providers: [
        ToastrService
    ]
})
export class ToastrModule {}
