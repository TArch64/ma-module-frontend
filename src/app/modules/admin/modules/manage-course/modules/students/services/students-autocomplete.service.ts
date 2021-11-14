import { asyncScheduler, BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, throttleTime } from 'rxjs/operators';
import { IInsecureUserJSON } from '@common/auth';
import { Injectable } from '@angular/core';
import { ManageStudentsSync } from '../sync';
import { IUsersAutocompleteService, UserInputData } from '../../common';

@Injectable()
export class StudentsAutocompleteService implements IUsersAutocompleteService {
    private readonly searchTrigger = new BehaviorSubject<string>('');
    public readonly users$: Observable<UserInputData[]> = this.searchTrigger.pipe(
        throttleTime(1000, asyncScheduler, { leading: true, trailing: true }),
        switchMap(this.load.bind(this))
    );

    constructor(
        private readonly syncService: ManageStudentsSync
    ) {}

    public triggerRequest(query: string): void {
        this.searchTrigger.next(query);
    }

    public reset(): void {
        this.searchTrigger.next('');
    }

    private load(query: string): Observable<UserInputData[]> {
        return this.searchUsers(query).pipe(map(this.createModels.bind(this)));
    }

    private createModels(students: IInsecureUserJSON[]): UserInputData[] {
        return students.map((student): UserInputData => new UserInputData(student.email));
    }

    private searchUsers(query: string): Observable<IInsecureUserJSON[]> {
        const formattedQuery = query.toLowerCase().trim();
        if (formattedQuery.length < 3) {
            return of([]);
        }
        return this.syncService.search(formattedQuery, 10);
    }
}
