import {KeyFactory} from "../key.factory";

function createService(scope: string, delimiter: string): KeyFactory {
    return new KeyFactory(scope, delimiter);
}

describe('generate key', () => {
    test('should generate key', () => {
        const factory = createService('test', '-');

        expect(factory.nextKey()).toEqual('test-1');
    });

    test('should uniq generate key', () => {
        const factory = createService('test', '-');

        factory.nextKey()
        factory.nextKey()
        factory.nextKey()
        factory.nextKey()

        expect(factory.nextKey()).toEqual('test-5');
    });
});
