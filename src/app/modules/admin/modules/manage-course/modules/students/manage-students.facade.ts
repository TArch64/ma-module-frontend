import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ManageStudentsService } from './services';

@Injectable({ providedIn: 'root' })
export class ManageStudentsFacade {
    constructor(private readonly manageStudentsService: ManageStudentsService) {}

    public addStudents(emails: string[]): Observable<null> {
        return this.manageStudentsService.addStudents(emails);
    }
}