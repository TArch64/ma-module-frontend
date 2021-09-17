import {Injectable} from "@angular/core";
import {ManageCourseService} from "../../../services";
import {Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Mentor, MentorRoles} from "@common/course";

@Injectable()
export class ManageMentorsService {
    public mentorsSnapshot: Mentor[] = [];
    public readonly mentors$ = this.manageCourseService.course$.pipe(
        map(course => course?.mentors || []),
        tap(mentors => this.mentorsSnapshot = mentors)
    );

    public leadMentorSnapshot: Mentor | null = null;
    public readonly leadMentor$: Observable<Mentor | null> = this.mentors$.pipe(
        map(mentors => mentors.find(mentor => mentor.isLead) ?? null),
        tap(mentor => this.leadMentorSnapshot = mentor)
    );

    constructor(private readonly manageCourseService: ManageCourseService) {}

    public changeLeadMentor(mentor: Mentor): Observable<null> {
        const mentors = this.mentorsSnapshot.slice();
        if (this.leadMentorSnapshot) {
            const oldLead = this.leadMentorSnapshot.clone({ role: MentorRoles.MENTOR });
            this.replaceMentor(mentors, oldLead)
        }
        this.replaceMentor(mentors, mentor.clone({ role: MentorRoles.LEAD }));
        this.manageCourseService.updateCourseMentors(mentors);
        return of(null);
    }

    private replaceMentor(mentors: Mentor[], mentor: Mentor): void {
        const index = mentors.findIndex(m => m.id === mentor.id);
        mentors.splice(index, 1, mentor);
    }
}
