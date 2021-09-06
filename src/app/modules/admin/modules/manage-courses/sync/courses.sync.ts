import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ICourseJSON} from "@common/course";
import {Season} from "@common/season";
import {ApiPathService, formatValidationHttpResponse} from "@common/core";
import {HttpClient} from "@angular/common/http";

export type AddCoursePayload = Omit<ICourseJSON, 'id'>;

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

    public addCourse(season: Season, payload: AddCoursePayload): Observable<ICourseJSON> {
        const url = this.apiPath.buildRolePath(['seasons', season.id, 'courses']);
        return this.httpClient.post<ICourseJSON>(url, payload).pipe(formatValidationHttpResponse);
    }
}
