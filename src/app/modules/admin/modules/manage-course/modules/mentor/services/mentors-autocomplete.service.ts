import {asyncScheduler, BehaviorSubject, Observable, of} from "rxjs";
import {ManageMentorsSync} from "../sync";
import {map, startWith, switchMap, throttleTime} from "rxjs/operators";
import {IInsecureUserJSON} from "@common/auth";
import {IUsersAutocompleteService, UserInputData} from "../../common";
import {Injectable} from "@angular/core";

@Injectable()
export class MentorsAutocompleteService implements IUsersAutocompleteService {
    private readonly searchTrigger = new BehaviorSubject<string>('');
    public readonly users$: Observable<UserInputData[]> = this.searchTrigger.pipe(
        startWith(''),
        throttleTime(500, asyncScheduler, { leading: true, trailing: true }),
        switchMap(this.load.bind(this))
    );

    constructor(
        private readonly syncService: ManageMentorsSync
    ) {}

    public triggerRequest(query: string): void {
        this.searchTrigger.next(query);
    }

    private load(query: string): Observable<UserInputData[]> {
        return this.searchUsers(query).pipe(map(this.createModels.bind(this)));
    }

    private createModels(mentors: IInsecureUserJSON[]): UserInputData[] {
        return mentors.map(mentor => new UserInputData(mentor.email));
    }

    private searchUsers(query: string): Observable<IInsecureUserJSON[]> {
        const formattedQuery = query.toLowerCase().trim();
        if (formattedQuery.length < 3) {
            return of([]);
        }
        return this.syncService.search(formattedQuery, 10);
    }
}
