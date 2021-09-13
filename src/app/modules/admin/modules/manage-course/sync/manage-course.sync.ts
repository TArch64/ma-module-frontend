import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ICourseJSON} from "@common/course";
import {ApiPathService} from "@common/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ManageCourseSync {
    constructor(
        private readonly apiPath: ApiPathService,
        private readonly httpClient: HttpClient
    ) {}

    public loadCourse(courseId: number): Observable<ICourseJSON | null> {
        const url = this.apiPath.buildRolePath(['courses', courseId]);
        return this.httpClient.get<ICourseJSON | null>(url);
    }
}
