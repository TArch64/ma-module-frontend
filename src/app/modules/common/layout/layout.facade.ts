import { Injectable } from '@angular/core';
import { CommonAuthService } from '@common/auth';
import { captureExistsValues } from '@common/core';
import { ProgressBarService } from './services';

@Injectable()
export class LayoutFacade {
    public readonly progressBarVisibility$ = this.progressBar.loading$;
    public readonly currentUser$ = this.authService.currentUser$.pipe(captureExistsValues);

    constructor(
        private readonly authService: CommonAuthService,
        private readonly progressBar: ProgressBarService
    ) {}

    public signOut(): void {
        this.authService.signOut();
    }
}
