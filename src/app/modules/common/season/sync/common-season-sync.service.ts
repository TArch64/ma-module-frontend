import { Injectable } from '@angular/core';
import { ApiPathService } from '@common/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISeasonJSON } from '../entities';

@Injectable({ providedIn: 'root' })
export class CommonSeasonSyncService {
    constructor(
        private readonly apiPath: ApiPathService,
        private readonly httpClient: HttpClient
    ) {}

    public loadSeasons(): Observable<ISeasonJSON[]> {
        const url = this.apiPath.buildRolePath(['seasons']);
        return this.httpClient.get<ISeasonJSON[]>(url);
    }
}
