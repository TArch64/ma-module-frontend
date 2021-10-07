import {Injectable} from "@angular/core";
import {ManageMentorsService} from "./services";
import {Observable} from "rxjs";
import {Mentor} from "@common/course";

@Injectable()
export class ManageMentorsFacade {
    public readonly mentors$ = this.mentorsService.mentors$;
    public readonly leadMentor$ = this.mentorsService.leadMentor$;

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
