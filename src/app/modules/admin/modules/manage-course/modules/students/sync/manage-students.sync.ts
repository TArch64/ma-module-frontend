import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPathService, formatValidationHttpResponse } from '@common/core';
import { IInsecureUserJSON } from '@common/auth';
import { IStudentJSON } from '@common/course';

@Injectable({ providedIn: 'root' })
export class ManageStudentsSync {
    constructor(
        private readonly apiPath: ApiPathService,
        private readonly httpClient: HttpClient
    ) {}

    public addStudents(courseId: string, emails: string[]): Observable<IStudentJSON[]> {
        const url = this.apiPath.buildRolePath(['courses', courseId, 'students']);
        return this.httpClient.post<IStudentJSON[]>(url, { emails }).pipe(formatValidationHttpResponse);
    }

    public search(query: string, limit: number): Observable<IInsecureUserJSON[]> {
        const url = this.apiPath.buildRolePath(['users', 'students']);
        const params = { query, limit };
        return this.httpClient.get<IInsecureUserJSON[]>(url, { params });
    }
}
