import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPathService, formatValidationHttpResponse } from '@common/core';
import { Observable } from 'rxjs';
import { IInsecureUserJSON } from '@common/auth';
import { IMentorJSON, Mentor } from '@common/course';

@Injectable()
export class ManageMentorsSync {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiPath: ApiPathService
    ) {}

    public changeLeadMentor(courseId: string, mentorId: string): Observable<object> {
        const url = this.apiPath.buildRolePath(['courses', courseId, 'lead-mentor']);
        return this.httpClient.post<object>(url, { mentorId });
    }

    public search(query: string, limit: number): Observable<IInsecureUserJSON[]> {
        const url = this.apiPath.buildRolePath(['users', 'mentors']);
        const params = { query, limit };
        return this.httpClient.get<IInsecureUserJSON[]>(url, { params });
    }

    public addMentors(courseId: string, emails: string[]): Observable<IMentorJSON[]> {
        const url = this.apiPath.buildRolePath(['courses', courseId, 'mentors']);
        return this.httpClient.post<IMentorJSON[]>(url, { emails }).pipe(formatValidationHttpResponse);
    }

    public removeFromCourse(mentor: Mentor): Observable<object> {
        const url = this.apiPath.buildRolePath(['users', 'mentors', mentor.id]);
        return this.httpClient.delete<object>(url);
    }
}
