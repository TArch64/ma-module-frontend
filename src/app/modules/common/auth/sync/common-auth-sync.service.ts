import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IUserJSON} from "../entities";
import {ApiPathService} from "@common/core";

export interface ISignInResponse {
    token: string;
}

@Injectable({ providedIn: 'root' })
export class CommonAuthSyncService {
    constructor(
        private readonly apiPath: ApiPathService,
        private readonly httpClient: HttpClient
    ) {}

    public signIn(username: string, password: string): Observable<ISignInResponse> {
        const url = this.apiPath.build(['auth', 'sign-in']);
        return this.httpClient.post<ISignInResponse>(url, { username, password });
    }

    public loadCurrentUser(): Observable<IUserJSON> {
        const url = this.apiPath.build(['users', 'current']);
        return this.httpClient.get<IUserJSON>(url);
    }
}
