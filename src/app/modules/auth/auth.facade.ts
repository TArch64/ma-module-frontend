import {Injectable} from "@angular/core";
import {CommonAuthService, User} from "@common/auth";
import {Observable} from "rxjs";

export interface IAuthFacade {
    signIn(email: string, password: string): Observable<User>;
}

@Injectable()
export class AuthFacade implements IAuthFacade {
    constructor(
        private readonly commonAuthService: CommonAuthService
    ) {}

    public signIn(email: string, password: string): Observable<User> {
        return this.commonAuthService.signIn(email, password);
    }
}
