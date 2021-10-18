import {Observable, of} from "rxjs";
import {CoursesRepository} from './courses.repository';
import {ICommonSeasonsService, Season} from "@common/season";
import {ICoursesRepositorySync} from "../sync";
import {CourseTypes} from "../enums";
import {Course, ICourseJSON} from "../entities";

class MockCoursesRepositorySync implements ICoursesRepositorySync {
    constructor(private courses: ICourseJSON[]) {}

    loadCourses(season: Season): Observable<ICourseJSON[]> {
        return of(this.courses);
    }
}

class MockCommonSeasonsService implements ICommonSeasonsService {
    seasons$: Observable<Season[]> = of([]);
    seasonsSnapshot: Season[] = [];
    isSeasonsLoaded: boolean = true;
    activeSeason: Season | null = null;

    currentSeason$: Observable<Season | null> = of(null);
    currentSeasonSnapshot: Season | null = null;

    loadSeasons(): Observable<Season[]> {
        return of([]);
    }

    changeCurrentSeason(season: Season): void {}
    addSeason(season: Season): void {}
    updateSeason(season: Season): void {}
    removeSeason(season: Season): void {}
}

function createSync(courses: ICourseJSON[]): ICoursesRepositorySync {
    return new MockCoursesRepositorySync(courses);
}

function createRepository(sync: ICoursesRepositorySync): CoursesRepository {
    return new CoursesRepository(sync, new MockCommonSeasonsService());
}

const createCourseJson = (attrs: Partial<ICourseJSON> = {}): ICourseJSON => ({
    id: 'test',
    name: 'test',
    type: CourseTypes.GENERAL,
    ...attrs
});

function createCourse(attrs: Partial<ICourseJSON> = {}): Course {
    return Course.fromJSON(createCourseJson(attrs));
}

describe('load courses', () => {
    test('should load courses', async () => {
        const sync = createSync([
            createCourseJson({ id: 'test-1' }),
            createCourseJson({ id: 'test-2' }),
            createCourseJson({ id: 'test-3' })
        ]);
        const repository = createRepository(sync);
        const courses = await repository.loadCourses().toPromise();

        expect(courses).toMatchSnapshot();
    });

    test('should save snapshot', async () => {
        const sync = createSync([
            createCourseJson({ id: 'test-1' }),
            createCourseJson({ id: 'test-2' }),
            createCourseJson({ id: 'test-3' })
        ]);
        const repository = createRepository(sync);
        await repository.loadCourses().toPromise();

        expect(repository.coursesSnapshot).toMatchSnapshot();
    });
});

describe('add course', () => {
    test('should add course to empty array', () => {
        const repository = createRepository(createSync([]));

        repository.addCourse(createCourse());

        expect(repository.coursesSnapshot).toMatchSnapshot();
    });

    test('should add course to existing courses', async () => {
        const repository = createRepository(createSync([
            createCourseJson({ id: 'test-1' })
        ]));
        await repository.loadCourses().toPromise();

        repository.addCourse(createCourse());

        expect(repository.coursesSnapshot).toMatchSnapshot();
    });
});
