import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ConfirmService} from "./services";
import {ConfirmDialogComponent} from "./components";

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    providers: [ConfirmService],
    declarations: [ConfirmDialogComponent]
})
export class ConfirmModule {}
