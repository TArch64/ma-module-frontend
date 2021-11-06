import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Course } from '@common/course';
import { ManageCourseFacade } from '../manage-course.facade';

@Injectable()
export class LoadCourseResolver implements Resolve<null> {
    constructor(
        private readonly facade: ManageCourseFacade,
        private readonly router: Router
    ) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<null> {
        return this.facade.loadCourse(route.params.courseId).pipe(
            switchMap((course: Course | null) => {
                if (course) return of(null);
                this.router.navigate(['/admin/courses']);
                return EMPTY;
            })
        );
    }
}
