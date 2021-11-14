import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-students-empty',
    templateUrl: './students-empty.component.html'
})
export class StudentsEmptyComponent {
    @Output()
    public onAddStudent = new EventEmitter();

    public addStudents(): void {
        this.onAddStudent.emit();
    }
}
