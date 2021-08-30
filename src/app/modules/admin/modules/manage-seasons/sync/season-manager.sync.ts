import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiPathService} from "@common/core";
import {IManagerStateJSON} from "../entities";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SeasonManagerSync {
    constructor(
        private readonly apiPath: ApiPathService,
        private readonly httpClient: HttpClient
    ) {}

    public loadState(): Observable<IManagerStateJSON> {
        const url = this.apiPath.buildRolePath(['course-seasons', 'manager-state']);
        return this.httpClient.get<IManagerStateJSON>(url);
    }

    public startSeason(): Observable<object> {
        const url = this.apiPath.buildRolePath(['course-seasons']);
        return this.httpClient.post(url, null);
    }
}
