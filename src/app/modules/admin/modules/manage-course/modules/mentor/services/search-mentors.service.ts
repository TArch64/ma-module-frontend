import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {ManageMentorsSync} from "../sync";
import {map, tap} from "rxjs/operators";
import {IInsecureUserJSON, InsecureUser} from "@common/auth";

@Injectable()
export class SearchMentorsService {
    private readonly mentorsSubject = new BehaviorSubject<InsecureUser[]>([]);
    public readonly mentors$ = this.mentorsSubject.asObservable()

    constructor(
        private readonly syncService: ManageMentorsSync
    ) {}

    public loadMentors(query: string): Observable<InsecureUser[]> {
        return this.searchUsers(query).pipe(
            map(mentors => mentors.map(InsecureUser.fromJSON)),
            tap(mentors => this.mentorsSubject.next(mentors))
        );
    }

    private searchUsers(query: string): Observable<IInsecureUserJSON[]> {
        const formattedQuery = query.toLowerCase().trim();
        if (formattedQuery.length < 3) {
            return of([]);
        }
        return this.syncService.search(formattedQuery, 10);
    }
}
