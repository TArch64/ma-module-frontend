import { Course, CourseTypes, ICourseJSON, Mentor, IMentorJSON, IStudentJSON, Student } from '@common/course';
import { IPrototype } from '@common/core';

export interface IFullCourseJSON extends ICourseJSON {
    mentors: IMentorJSON[];
    students: IStudentJSON[];
}

export class FullCourse extends Course implements IPrototype<IFullCourseJSON> {
    public static fromJSON(json: IFullCourseJSON): FullCourse {
        return new FullCourse(
            json.id,
            json.name,
            json.type,
            json.mentors.map(Mentor.fromJSON),
            json.students.map(Student.fromJSON)
        );
    }

    protected constructor(
        id: string,
        name: string,
        type: CourseTypes,
        public readonly mentors: Mentor[],
        public readonly students: Student[]
    ) {
        super(id, name, type);
    }

    public clone(overrides: Partial<IFullCourseJSON> = {}): FullCourse {
        return FullCourse.fromJSON({ ...this, ...overrides });
    }
}
