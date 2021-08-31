import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ICourseJSON} from "@common/course";
import {Season} from "@common/season";
import {ApiPathService} from "@common/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CoursesSync {
    constructor(
        private readonly apiPath: ApiPathService,
        private readonly httpClient: HttpClient
    ) {}

    public loadCourses(season: Season): Observable<ICourseJSON[]> {
        const url = this.apiPath.buildRolePath(['seasons', season.id, 'courses']);
        return this.httpClient.get<ICourseJSON[]>(url);
    }
}
