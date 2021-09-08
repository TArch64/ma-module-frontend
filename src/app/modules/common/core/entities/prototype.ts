export interface IPrototype<T extends {}> {
    clone(overrides?: Partial<T>): IPrototype<T>;
}
