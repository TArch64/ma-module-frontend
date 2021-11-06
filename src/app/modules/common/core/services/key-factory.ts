import { FactoryProvider } from '@angular/core';

export class KeyFactory {
    private id: number = 0;

    public static createProvider(scope: string, delimiter: string = '-'): FactoryProvider {
        return {
            provide: KeyFactory,
            useFactory: () => new KeyFactory(scope, delimiter)
        };
    }

    private constructor(
        private readonly scope: string,
        private readonly delimiter: string
    ) {}

    public nextKey(): string {
        return [this.scope, this.delimiter, ++this.id].join('');
    }
}
