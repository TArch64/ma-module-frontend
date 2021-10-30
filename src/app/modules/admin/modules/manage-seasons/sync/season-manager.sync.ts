import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiPathService, formatValidationHttpResponse} from "@common/core";
import {HttpClient} from "@angular/common/http";
import {ISeasonJSON, Season} from "@common/season";

export interface ISeasonManagerSync {
    addSeason(makeActive: boolean): Observable<ISeasonJSON>;
    activateSeason(season: Season): Observable<object>;
    deactivateSeason(season: Season): Observable<object>;
    removeSeason(season: Season): Observable<object>;
}

@Injectable()
export class SeasonManagerSync implements ISeasonManagerSync {
    constructor(
        private readonly apiPath: ApiPathService,
        private readonly httpClient: HttpClient
    ) {}

    public addSeason(makeActive: boolean): Observable<ISeasonJSON> {
        const url = this.apiPath.buildRolePath(['seasons']);
        return this.httpClient.post<ISeasonJSON>(url, { makeActive });
    }

    public activateSeason(season: Season): Observable<object> {
        const url = this.apiPath.buildRolePath(['seasons', 'activate']);
        return this.httpClient.post(url, { seasonId: season.id }).pipe(formatValidationHttpResponse);
    }

    public deactivateSeason(season: Season): Observable<object> {
        const url = this.apiPath.buildRolePath(['seasons', 'deactivate']);
        return this.httpClient.post(url, { seasonId: season.id }).pipe(formatValidationHttpResponse);
    }

    public removeSeason(season: Season): Observable<object> {
        const url = this.apiPath.buildRolePath(['seasons', season.id]);
        return this.httpClient.delete(url);
    }
}
