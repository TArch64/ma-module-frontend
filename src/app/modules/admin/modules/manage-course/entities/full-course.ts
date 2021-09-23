import {Course, CourseTypes, ICourseJSON, Mentor, IMentorJSON} from "@common/course";
import {IPrototype} from "@common/core";

export interface IFullCourseJSON extends ICourseJSON {
    mentors: IMentorJSON[];
}

export class FullCourse extends Course implements IPrototype<IFullCourseJSON> {
    public static fromJSON(json: IFullCourseJSON): FullCourse {
        return new FullCourse(
            json.id,
            json.name,
            json.type,
            json.mentors.map(Mentor.fromJSON)
        );
    }

    protected constructor(
        id: string,
        name: string,
        type: CourseTypes,
        public readonly mentors: Mentor[]
    ) {
        super(id, name, type);
    }

    public clone(overrides: Partial<IFullCourseJSON> = {}): FullCourse {
        return FullCourse.fromJSON({...this, ...overrides});
    }
}
