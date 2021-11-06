import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    HostBinding,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges,
    ViewContainerRef
} from '@angular/core';
import { BooleanInput } from 'ngx-boolean-input';
import { MatButton } from '@angular/material/button';
import { ButtonLoaderComponent } from '../components';

@Directive({
    selector: '[appMatLoadingButton]'
})
export class MatLoadingButtonDirective implements OnChanges {
    private loadingComponentRef: ComponentRef<ButtonLoaderComponent> | null = null;

    @Input('appMatLoadingButton')
    @BooleanInput()
    @HostBinding('class.loading-button')
    public isLoading!: boolean;

    @Input('disabled')
    @BooleanInput()
    public originalDisabled: boolean = false;

    constructor(
        private readonly matButtonRef: MatButton,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly renderer: Renderer2
    ) {}

    public ngOnChanges(changes: SimpleChanges) {
        if ('isLoading' in changes) {
            this.isLoading ? this.renderLoading() : this.renderInitial();
        }
    }

    private renderLoading(): void {
        this.matButtonRef.disabled = true;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ButtonLoaderComponent);
        this.loadingComponentRef = this.viewContainerRef.createComponent(componentFactory);
        this.renderer.appendChild(this.viewContainerRef.element.nativeElement, this.loadingComponentRef.location.nativeElement);
    }

    private renderInitial(): void {
        this.matButtonRef.disabled = this.originalDisabled;
        if (this.loadingComponentRef) {
            this.loadingComponentRef?.destroy();
            this.loadingComponentRef = null;
        }
    }
}
