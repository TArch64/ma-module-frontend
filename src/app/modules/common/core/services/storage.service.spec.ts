import {StorageService} from "./storage.service";
import {ISerializerService} from "./serializer.service";

class MockStorage implements Storage {
    public data: Record<string, string> = {};

    key(index: number): string | null {
        return Object.keys(this.data)[index] || null;
    }

    get length(): number {
        return Object.keys(this.data).length;
    }

    clear() {
        this.data = {};
    }

    getItem(key: string): string | null {
        return this.data[key] || null;
    }

    removeItem(key: string) {
        delete this.data[key];
    }

    setItem(key: string, value: string) {
        this.data[key] = value;
    }
}

class MockSerializer implements ISerializerService {
    fromJSON<T>(json: string): T | null {
        return JSON.parse(json);
    }

    toJSON<T>(value: T): string {
        return JSON.stringify(value);
    }
}

function createService() {
    const storage = new MockStorage();
    const service = new StorageService('test', new MockSerializer(), storage);

    return { service, storage };
}

describe('build key', () => {
    test('should build storage key', () => {
        const { service } = createService();

        expect(service.buildKey('data')).toMatchSnapshot();
    });
});

describe('get item', () => {
    test('should get item', () => {
        const { service, storage } = createService();

        storage.setItem(service.buildKey('data'), '{ "hello": "world" }')

        expect(service.getItem('data')).toEqual({ hello: 'world' });
    });

    test('should get non existing value', () => {
        const { service } = createService();

        expect(service.getItem('data')).toEqual(null);
    });
});

describe('set item', () => {
    test('should add item', () => {
        const { service, storage } = createService();

        service.setItem('data', { hello: 'world' })

        expect(storage.data).toMatchSnapshot();
    });

    test('should add second item', () => {
        const { service, storage } = createService();

        storage.setItem(service.buildKey('data-1'), '[123]')
        service.setItem('data', { hello: 'world' })

        expect(storage.data).toMatchSnapshot();
    });

    test('should override item', () => {
        const { service, storage } = createService();

        storage.setItem(service.buildKey('data'), '{ "data": "old" }')
        service.setItem('data', { "data": "new" })

        expect(storage.data).toMatchSnapshot();
    });
});

describe('remove item', () => {
    test('should remove item', () => {
        const { service, storage } = createService();

        storage.setItem(service.buildKey('data'), '{ "data": "value" }')
        service.removeItem('data');

        expect(storage.data).toMatchSnapshot();
    });

    test('should remove non-existing item', () => {
        const { service, storage } = createService();

        service.removeItem('data');

        expect(storage.data).toMatchSnapshot();
    });
});
