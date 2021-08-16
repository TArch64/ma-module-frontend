import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class ToastrService {
    constructor(
        private readonly snackBar: MatSnackBar
    ) {}

    public show(text: string): void {
        this.snackBar.open(text);
    }
}
