import {Component} from '@angular/core';
import {BannerEventsProxy, BannerOptions} from "@common/banner/entities";
import {ThemePalette} from "@angular/material/core";
import {BannerTypes} from "@common/banner/enums";

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

    constructor(
        public readonly options: BannerOptions,
        private readonly events: BannerEventsProxy
    ) {
        const typeConfig = CONFIG_MAPPING[this.options.type];
        this.primaryColor = typeConfig.primaryColor;
        this.bannerIcon = typeConfig.bannerIcon;
    }

    public close(): void {
        this.events.close();
    }
}
