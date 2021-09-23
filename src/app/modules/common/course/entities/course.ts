import {CourseTypes} from "../enums";

export interface ICourseJSON {
    id: string,
    name: string,
    type: CourseTypes
}

export class Course {
    public static fromJSON(json: ICourseJSON): Course {
        return new Course(json.id, json.name, json.type);
    }

    protected constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly type: CourseTypes
    ) {}
}
