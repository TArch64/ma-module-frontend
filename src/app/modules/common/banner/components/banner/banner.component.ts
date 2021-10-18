import {Component, Inject} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {BannerEventsProxy, BannerOptions, IBannerEventsProxy} from "../../entities";
import {BannerTypes} from "../../enums";

interface TypeConfig {
    primaryColor: ThemePalette;
    bannerIcon: string;
}

const CONFIG_MAPPING: Record<BannerTypes, TypeConfig> = {
    [BannerTypes.WARNING]: {
        primaryColor: 'warn',
        bannerIcon: 'warning'
    }
};

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
    public readonly bannerClasses = `banner--${this.options.type.toLowerCase()}`;
    public readonly primaryColor: ThemePalette;
    public readonly bannerIcon: string;
    public readonly title: string = this.options.title;
    public readonly isClosable: boolean = this.options.closable;

    constructor(
        @Inject(BannerEventsProxy)
        private readonly events: IBannerEventsProxy,
        private readonly options: BannerOptions
    ) {
        const typeConfig = CONFIG_MAPPING[this.options.type];
        this.primaryColor = typeConfig.primaryColor;
        this.bannerIcon = typeConfig.bannerIcon;
    }

    public close(): void {
        this.events.close();
    }
}
