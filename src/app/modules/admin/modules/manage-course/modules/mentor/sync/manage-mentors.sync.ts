import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiPathService} from "@common/core";
import {Observable} from "rxjs";
import {IUserJSON} from "@common/auth";

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

    public filterByUsername(username: string, limit: number): Observable<IUserJSON[]> {
        const url = this.apiPath.build(['users', 'mentors']);
        const params = { username, limit };
        return this.httpClient.get<IUserJSON[]>(url, { params });
    }
}
