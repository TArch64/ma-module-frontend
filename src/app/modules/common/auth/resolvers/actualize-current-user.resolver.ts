import {Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CommonAuthService} from "@common/auth";

@Injectable()
export class ActualizeCurrentUserResolver implements Resolve<null> {
    constructor(
        private readonly authService: CommonAuthService
    ) {}

    resolve(): Observable<null> | null {
        if (!this.authService.isSignedIn) return null;
        return this.authService.actualizeUser()
    }
}
