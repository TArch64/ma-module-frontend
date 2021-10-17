import {Component} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {BindControlErrorDirective} from "./bind-control-error.directive";
import {By} from "@angular/platform-browser";

@Component({template: '<p appBindControlError="test"></p>'})
class TestComponent {}

function createComponent(): ComponentFixture<TestComponent> {
    const module = TestBed.configureTestingModule({
        declarations: [TestComponent, BindControlErrorDirective]
    });
    return module.createComponent(TestComponent);
}

function bindDirective(fixture: ComponentFixture<TestComponent>, form: FormGroup) {
    fixture.detectChanges();
    const directiveEl = fixture.debugElement.query(By.directive(BindControlErrorDirective));
    const directive = directiveEl.injector.get(BindControlErrorDirective);
    directive.bindControl(form);
}

describe('rendering', () => {
    test('should render error message on invalid', () => {
        const fixture = createComponent();
        const form = new FormGroup({
            test: new FormControl('')
        });
        bindDirective(fixture, form);

        form.get('test')?.setErrors({ message: 'test' });
        const directiveEl = fixture.debugElement.query(By.directive(BindControlErrorDirective));

        expect(directiveEl.properties.innerText).toEqual('test');
    });

    test('should render initial state', () => {
        const fixture = createComponent();
        const form = new FormGroup({
            test: new FormControl('')
        });
        form.get('test')?.setErrors({ message: 'test' });
        bindDirective(fixture, form);
        const directiveEl = fixture.debugElement.query(By.directive(BindControlErrorDirective));

        expect(directiveEl.properties.innerText).toEqual('test');
    });

    test('should render valid message placeholder', () => {
        const fixture = createComponent();
        const form = new FormGroup({
            test: new FormControl('')
        });
        bindDirective(fixture, form);
        const directiveEl = fixture.debugElement.query(By.directive(BindControlErrorDirective));

        expect(directiveEl.properties.innerText).toBeFalsy();
    });
});
