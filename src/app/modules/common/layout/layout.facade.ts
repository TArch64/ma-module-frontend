import {Injectable} from "@angular/core";
import {CommonAuthService} from "@common/auth";
import {Observable} from "rxjs";
import {User} from "@common/auth/entities";
import {captureExistsValues} from "@common/core";

@Injectable()
export class LayoutFacade {
    constructor(private readonly authService: CommonAuthService) {}

    public get currentUser$(): Observable<User> {
        return this.authService.currentUser$.pipe(captureExistsValues);
    }

    public signOut(): void {
        this.authService.signOut();
    }
}
