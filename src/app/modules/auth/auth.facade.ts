import {Injectable} from "@angular/core";
import {CommonAuthService, User} from "@common/auth";
import {Observable} from "rxjs";

@Injectable()
export class AuthFacade {
    constructor(
        private readonly commonAuthService: CommonAuthService
    ) {}

    public signIn(username: string, password: string): Observable<User> {
        return this.commonAuthService.signIn(username, password);
    }
}
