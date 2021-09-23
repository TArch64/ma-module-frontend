import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiPathService} from "@common/core";
import {HttpClient} from "@angular/common/http";
import {IFullCourseJSON} from "../entities";

@Injectable()
export class ManageCourseSync {
    constructor(
        private readonly apiPath: ApiPathService,
        private readonly httpClient: HttpClient
    ) {}

    public loadCourse(courseId: string): Observable<IFullCourseJSON | null> {
        const url = this.apiPath.buildRolePath(['courses', courseId]);
        return this.httpClient.get<IFullCourseJSON | null>(url);
    }
}
