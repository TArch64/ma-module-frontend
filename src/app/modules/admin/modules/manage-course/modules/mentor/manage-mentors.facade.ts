import {Injectable} from "@angular/core";
import {ManageMentorsService} from "./services";
import {Observable} from "rxjs";
import {Mentor} from "@common/course";
import {map} from "rxjs/operators";

@Injectable()
export class ManageMentorsFacade {
    public readonly mentors$ = this.mentorsService.mentors$;
    public readonly leadMentor$ = this.mentorsService.leadMentor$;

    public readonly regularMentors$ = this.mentors$.pipe(
        map(mentors => mentors.filter(mentor => mentor.isRegular))
    );

    constructor(
        private readonly mentorsService: ManageMentorsService,
    ) {}

    public changeLeadMentor(mentor: Mentor): Observable<null> {
        return this.mentorsService.changeLeadMentor(mentor);
    }

    public addMentors(emails: string[]): Observable<null> {
        return this.mentorsService.addMentors(emails);
    }
}
