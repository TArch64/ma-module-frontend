import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {ManageCoursesFacade} from "../manage-courses.facade";

@Injectable()
export class ManageCoursesResolver implements Resolve<null> {
    constructor(private readonly facade: ManageCoursesFacade) {}

    public resolve(): Observable<null> {
        return this.facade.loadState();
    }
}
