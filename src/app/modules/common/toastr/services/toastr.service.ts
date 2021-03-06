import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrModule } from '../toastr.module';

@Injectable({ providedIn: ToastrModule })
export class ToastrService {
    constructor(private readonly snackBar: MatSnackBar) {}

    public show(text: string): void {
        this.snackBar.open(text, 'Ok', {
            duration: 5000
        });
    }
}
