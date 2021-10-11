import {SerializerService} from "../serializer.service";

const createService = () => new SerializerService()

describe('from json', () => {
    test('should parse json', () => {
        const service = createService();

        expect(service.fromJSON('{ "test": 123 }')).toEqual({ test: 123 });
    });

    test('should return null on invalid json', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation();
        const service = createService();

        expect(service.fromJSON('{ "test": 1')).toEqual(null);
        consoleError.mockRestore();
    });
});

describe('to json', () => {
    test('should create json', () => {
        const service = createService();

        expect(service.toJSON({ test: 123 })).toMatchSnapshot()
    });
});
