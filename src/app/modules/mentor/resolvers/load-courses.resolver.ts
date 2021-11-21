import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { first, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { MentorFacade } from '../mentor.facade';

@Injectable({ providedIn: 'root' })
export class LoadCoursesResolver implements Resolve<null> {
    constructor(private readonly facade: MentorFacade) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<null> {
        return this.facade.loadCourses().pipe(mapTo(null), first());
    }
}
