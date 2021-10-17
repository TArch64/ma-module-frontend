import {requireArrayLength} from './require-array-length';
import {FormControl} from "@angular/forms";

function createControl(value: string[]): FormControl {
    return new FormControl(value, requireArrayLength(1, 'test'));
}

describe('validate array length', () => {
    test('should pass if items in array', () => {
        const control = createControl(['test', 'test 2']);

        expect(control.errors).toEqual(null)
    });

    test('should fail if no items in array', () => {
        const control = createControl([]);

        expect(control.errors?.minArrayLength).toBeTruthy();
    });
});
