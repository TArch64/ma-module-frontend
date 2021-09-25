import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {ManageMentorsSync} from "../sync";
import {map, tap} from "rxjs/operators";
import {IUserJSON, User} from "@common/auth";

@Injectable()
export class SearchMentorsService {
    private readonly mentorsSubject = new BehaviorSubject<User[]>([]);
    public readonly mentors$ = this.mentorsSubject.asObservable()

    constructor(
        private readonly syncService: ManageMentorsSync
    ) {}

    public loadMentors(username: string): Observable<User[]> {
        return this.searchUsers(username).pipe(
            map(mentors => mentors.map(User.fromJSON)),
            tap(mentors => this.mentorsSubject.next(mentors))
        );
    }

    private searchUsers(username: string): Observable<IUserJSON[]> {
        const formattedUsername = username.toLowerCase().trim();
        if (formattedUsername.length < 3) {
            return of([]);
        }
        return this.syncService.filterByUsername(formattedUsername, 5);
    }
}
