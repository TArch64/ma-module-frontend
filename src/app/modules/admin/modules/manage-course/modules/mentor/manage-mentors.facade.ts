import {Injectable} from "@angular/core";
import {SearchMentorsService, ManageMentorsService} from "./services";
import {Observable, of} from "rxjs";
import {Mentor} from "@common/course";
import {mapTo} from "rxjs/operators";

@Injectable()
export class ManageMentorsFacade {
    public readonly mentors$ = this.mentorsService.mentors$;
    public readonly leadMentor$ = this.mentorsService.leadMentor$;
    public readonly mentorsSearch$ = this.searchService.mentors$;

    constructor(
        private readonly mentorsService: ManageMentorsService,
        private readonly searchService: SearchMentorsService
    ) {}

    public changeLeadMentor(mentor: Mentor): Observable<null> {
        return this.mentorsService.changeLeadMentor(mentor);
    }

    public searchMentors(username: string): Observable<null> {
        return this.searchService.loadMentors(username).pipe(mapTo(null));
    }

    public addMentor(): Observable<null> {
        return of(null);
    }
}
