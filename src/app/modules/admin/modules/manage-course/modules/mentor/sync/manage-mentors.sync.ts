import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiPathService} from "@common/core";
import {Observable} from "rxjs";

@Injectable()
export class ManageMentorsSync {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiPath: ApiPathService
    ) {}

    public changeLeadMentor(courseId: string, mentorId: string): Observable<object> {
        const url = this.apiPath.buildRolePath(['courses', courseId, 'lead-mentor'])
        return this.httpClient.post<object>(url, { mentorId });
    }
}
