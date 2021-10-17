import {buildValidator} from './build-validator';
import {FormControl} from "@angular/forms";

describe('decorate validator', () => {
    test('should add message if control invalid', () => {
        const validator = buildValidator({
            validate: () => ({ testError: true }),
            message: 'test'
        });
        const validation = validator(new FormControl());

        expect(validation?.message).toEqual('test');
    });

    test('should not message if control valid', () => {
        const validator = buildValidator({
            validate: () => null,
            message: 'test'
        });
        const validation = validator(new FormControl());

        expect(validation).toBeFalsy();
    });
});
