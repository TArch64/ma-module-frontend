import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {ManageSeasonsFacade} from "../manage-seasons.facade";

@Injectable()
export class ManageSeasonsResolver implements Resolve<null> {
    constructor(private readonly facade: ManageSeasonsFacade) {}

    resolve(): Observable<null> {
        return this.facade.loadState();
    }
}
