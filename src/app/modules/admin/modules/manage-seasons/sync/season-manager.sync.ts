import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiPathService, formatValidationHttpResponse} from "@common/core";
import {HttpClient} from "@angular/common/http";
import {ISeasonJSON, Season} from "@common/season/entities";

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

    public activateSeason(season: Season): Observable<object> {
        const url = this.apiPath.buildRolePath(['course-seasons', 'activate']);
        return this.httpClient.post(url, { seasonId: season.id }).pipe(formatValidationHttpResponse);
    }

    public deactivateSeason(season: Season): Observable<object> {
        const url = this.apiPath.buildRolePath(['course-seasons', 'deactivate']);
        return this.httpClient.post(url, { seasonId: season.id }).pipe(formatValidationHttpResponse);
    }

    public removeSeason(season: Season): Observable<object> {
        const url = this.apiPath.buildRolePath(['course-seasons', season.id]);
        return this.httpClient.delete(url);
    }
}
