import {UserRoles} from "@common/auth";
import {RoleTitlePipe} from "../role-title.pipe";

describe('transform', () => {
    const transform = (role: UserRoles) => new RoleTitlePipe().transform(role);

    test('should get admin title', () => {
        expect(transform(UserRoles.ADMIN)).toMatchSnapshot();
    });

    test('should get mentor title', () => {
        expect(transform(UserRoles.MENTOR)).toMatchSnapshot();
    });

    test('should get student title', () => {
        expect(transform(UserRoles.STUDENT)).toMatchSnapshot()
    });
});
