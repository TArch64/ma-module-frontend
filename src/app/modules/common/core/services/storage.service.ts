import {inject, InjectionToken} from "@angular/core";
import {ISerializerService, SerializerService} from "./serializer.service";

export class StorageService {
    public static readonly LOCAL_STORAGE = StorageService.createInjector('localStorage', localStorage);

    public static createInjector(name: string, storage: Storage): InjectionToken<StorageService> {
        return new InjectionToken(name, {
            providedIn: 'root',
            factory: () => new StorageService('ma', inject(SerializerService), storage)
        });
    }

    constructor(
        private readonly prefix: string,
        private readonly serializer: ISerializerService,
        private readonly nativeStorage: Storage
    ) {}

    public getItem<T>(key: string): T | null {
        const json = this.nativeStorage.getItem(this.buildKey(key))
        return json ? this.serializer.fromJSON(json) : null;
    }

    public setItem<T>(key: string, value: T): void {
        const json = this.serializer.toJSON(value);
        this.nativeStorage.setItem(this.buildKey(key), json);
    }

    public removeItem(key: string): void {
        this.nativeStorage.removeItem(this.buildKey(key));
    }

    public buildKey(key: string): string {
        return [this.prefix, key].join('.')
    }
}
