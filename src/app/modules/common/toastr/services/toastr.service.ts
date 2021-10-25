import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface IToastrService {
    show(text: string): void;
}

@Injectable()
export class ToastrService implements IToastrService {
    constructor(private readonly snackBar: MatSnackBar) {}

    public show(text: string): void {
        this.snackBar.open(text, 'Ok', {
            duration: 5000
        });
    }
}
