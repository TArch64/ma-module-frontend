import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPathService, formatValidationHttpResponse } from '@common/core';
import { IInsecureUserJSON } from '@common/auth';
import { IStudentJSON, Student } from '@common/course';
import { IPendingInvitationJSON } from '../../../entities';

export interface IAddedStudentsResponse {
    students: IStudentJSON[];
    invitations: IPendingInvitationJSON[];
}

@Injectable({ providedIn: 'root' })
export class ManageStudentsSync {
    constructor(
        private readonly apiPath: ApiPathService,
        private readonly httpClient: HttpClient
    ) {}

    public addStudents(courseId: string, emails: string[]): Observable<IAddedStudentsResponse> {
        const url = this.apiPath.buildRolePath(['courses', courseId, 'students']);
        return this.httpClient.post<IAddedStudentsResponse>(url, { emails }).pipe(formatValidationHttpResponse);
    }

    public search(query: string, limit: number): Observable<IInsecureUserJSON[]> {
        const url = this.apiPath.buildRolePath(['users', 'students']);
        const params = { query, limit };
        return this.httpClient.get<IInsecureUserJSON[]>(url, { params });
    }

    public removeFromCourse(student: Student): Observable<object> {
        const url = this.apiPath.buildRolePath(['courses', 'students', student.id]);
        return this.httpClient.delete<object>(url);
    }
}
