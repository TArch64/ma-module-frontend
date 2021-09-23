import {Injectable} from "@angular/core";
import {ManageCourseService} from "../../../services";
import {Observable} from "rxjs";
import {map, mapTo, tap} from "rxjs/operators";
import {Mentor, MentorRoles} from "@common/course";
import {ManageMentorsSync} from "../sync";

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

    constructor(
        private readonly manageCourseService: ManageCourseService,
        private readonly syncService: ManageMentorsSync
    ) {}

    public changeLeadMentor(mentor: Mentor): Observable<null> {
        const courseId = this.manageCourseService.courseSnapshot!.id;
        return this.syncService.changeLeadMentor(courseId, mentor.id).pipe(
            tap(() => {
                const mentors = this.mentorsSnapshot.slice();
                if (this.leadMentorSnapshot) {
                    const oldLead = this.leadMentorSnapshot.clone({ role: MentorRoles.MENTOR });
                    this.replaceMentor(mentors, oldLead)
                }
                this.replaceMentor(mentors, mentor.clone({ role: MentorRoles.LEAD }));
                this.manageCourseService.updateCourseMentors(mentors);
            }),
            mapTo(null)
        );
    }

    private replaceMentor(mentors: Mentor[], mentor: Mentor): void {
        const index = mentors.findIndex(m => m.id === mentor.id);
        mentors.splice(index, 1, mentor);
    }
}
