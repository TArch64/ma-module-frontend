import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiPathService} from "@common/core";
import {HttpClient} from "@angular/common/http";
import {ISeasonJSON} from "@common/season/entities";

@Injectable()
export class SeasonManagerSync {
    constructor(
        private readonly apiPath: ApiPathService,
        private readonly httpClient: HttpClient
    ) {}

    public addSeason(makeActive: boolean): Observable<ISeasonJSON> {
        const url = this.apiPath.buildRolePath(['course-seasons']);
        return this.httpClient.post<ISeasonJSON>(url, { makeActive });
    }

    public startSeason(): Observable<object> {
        const url = this.apiPath.buildRolePath(['course-seasons']);
        return this.httpClient.post(url, null);
    }

    public finishActiveSeason(): Observable<object> {
        const url = this.apiPath.buildRolePath(['course-seasons', 'active', 'finish']);
        return this.httpClient.post(url, null);
    }
}
