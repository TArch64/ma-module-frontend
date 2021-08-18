import {Injectable} from "@angular/core";
import {CommonAuthService} from "@common/auth";
import {Observable} from "rxjs";
import {User} from "@common/auth/entities";

@Injectable()
export class AuthFacade {
    constructor(
        private readonly commonAuthService: CommonAuthService
    ) {}

    public signIn(username: string, password: string): Observable<User> {
        return this.commonAuthService.signIn(username, password);
    }
}
