import { Course, CourseTypes, ICourseJSON, Mentor, IMentorJSON, IStudentJSON, Student } from '@common/course';
import { IPrototype } from '@common/core';
import { IPendingInvitationJSON, PendingInvitation } from './pending-invitation';

export interface IFullCourseJSON extends ICourseJSON {
    mentors: IMentorJSON[];
    pendingMentorInvitations: IPendingInvitationJSON[];
    students: IStudentJSON[];
    pendingStudentInvitations: IPendingInvitationJSON[];
}

export class FullCourse extends Course implements IPrototype<IFullCourseJSON> {
    public static fromJSON(json: IFullCourseJSON): FullCourse {
        return new FullCourse(
            json.id,
            json.name,
            json.type,
            json.mentors.map(Mentor.fromJSON),
            json.pendingMentorInvitations.map(PendingInvitation.fromJSON),
            json.students.map(Student.fromJSON),
            json.pendingStudentInvitations.map(PendingInvitation.fromJSON)
        );
    }

    protected constructor(
        id: string,
        name: string,
        type: CourseTypes,
        public readonly mentors: Mentor[],
        public readonly pendingMentorInvitations: PendingInvitation[],
        public readonly students: Student[],
        public readonly pendingStudentInvitations: PendingInvitation[]
    ) {
        super(id, name, type);
    }

    public clone(overrides: Partial<IFullCourseJSON> = {}): FullCourse {
        return FullCourse.fromJSON({ ...this, ...overrides });
    }
}
