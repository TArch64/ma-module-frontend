import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {ManageSeasonsFacade} from "../manage-seasons.facade";

@Injectable()
export class ManageSeasonsResolver implements Resolve<null> {
    constructor(private readonly facade: ManageSeasonsFacade) {}

    resolve(): null {
        this.facade.loadState();
        return null;
    }
}