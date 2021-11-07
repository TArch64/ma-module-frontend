import { Component } from '@angular/core';
import { ManageCourseFacade } from '../../manage-course.facade';

interface ITabLink {
    title: string;
    path: Array<string | number>;
}

@Component({
    selector: 'app-manage-course-page',
    templateUrl: './manage-course-page.component.html',
    styleUrls: ['./manage-course-page.component.css']
})
export class ManageCoursePageComponent {
    public readonly course = this.facade.course!;

    public readonly links: ITabLink[] = [
        this.buildTabLink('Mentors', 'mentors'),
        this.buildTabLink('Students', 'students')
    ];

    constructor(private readonly facade: ManageCourseFacade) {}

    private buildTabLink(title: string, tabPath: string): ITabLink {
        return {
            title,
            path: ['/admin', 'courses', this.course.id, tabPath]
        };
    }
}
