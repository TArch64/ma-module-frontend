import {inject, InjectionToken} from "@angular/core";
import {SerializerService} from "@common/core";

export class StorageService {
    public static readonly LOCAL_STORAGE = StorageService.createInjector('localStorage', localStorage);

    private static createInjector(name: string, storage: Storage): InjectionToken<StorageService> {
        return new InjectionToken(name, {
            providedIn: 'root',
            factory: () => new StorageService('ma', inject(SerializerService), storage)
        });
    }

    private constructor(
        private readonly prefix: string,
        private readonly serializer: SerializerService,
        private readonly nativeStorage: Storage
    ) {}

    public getItem<T>(key: string): T | null {
        const json = this.nativeStorage.getItem(this.buildKey(key))
        return json ? this.serializer.parse(json) : null;
    }

    public setItem<T>(key: string, value: T): void {
        const json = this.serializer.stringify(value);
        this.nativeStorage.setItem(this.buildKey(key), json);
    }

    public removeItem(key: string): void {
        this.nativeStorage.removeItem(this.buildKey(key));
    }

    public buildKey(key: string): string {
        return [this.prefix, key].join('.')
    }
}
