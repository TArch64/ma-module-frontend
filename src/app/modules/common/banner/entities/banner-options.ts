import { BannerTypes } from '../enums';

export interface IBannerOptions {
    title: string,
    closable?: boolean
}

export class BannerOptions {
    public static create(type: BannerTypes, options: IBannerOptions): BannerOptions {
        return new BannerOptions(
            options.title,
            type,
            options.closable ?? true
        );
    }

    private constructor(
        public readonly title: string,
        public readonly type: BannerTypes,
        public readonly closable: boolean
    ) {}
}
