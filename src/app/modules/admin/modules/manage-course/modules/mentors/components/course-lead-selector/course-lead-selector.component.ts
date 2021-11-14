import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Disposable } from '@common/core';
import { Mentor } from '@common/course';
import { ManageMentorsFacade } from '../../manage-mentors.facade';

@Component({
    selector: 'app-course-lead-selector',
    templateUrl: './course-lead-selector.component.html',
    styleUrls: ['./course-lead-selector.component.css']
})
export class CourseLeadSelectorComponent implements OnDestroy {
    private readonly disposable = new Disposable();
    public readonly control = new FormControl();
    public readonly mentors$ = this.facade.mentors$;

    constructor(private readonly facade: ManageMentorsFacade) {
        this.disposable.subscribeTo(this.control.valueChanges, (mentor: Mentor): void => {
            this.facade.changeLeadMentor(mentor).subscribe();
        });
        this.disposable.subscribeTo(this.facade.leadMentor$, (mentor): void => {
            this.control.setValue(mentor, { emitEvent: false });
        });
    }

    public ngOnDestroy(): void {
        this.disposable.dispose();
    }
}
