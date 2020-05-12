import { Components, MaterialHtmlComponent, MaterialComponent } from 'angular-material-formio';
import HtmlComponent from 'formiojs/components/html/HTML.js';
import {Component} from '@angular/core';

export class HeaderComponent extends HtmlComponent {
    // Custom logic goes here.
}

@Component({
    template: '<div>dropzone comes here</div>'
})
export class MaterialHeaderComponent extends MaterialComponent {
    // Custom Material logic goes here.
}

const CompClass = (HeaderComponent as any);
CompClass.MaterialComponent = MaterialHeaderComponent;
CompClass.prototype.render = (function () {
    if (this.materialComponent) {
        return this.materialComponent;
    }
    const viewContainer = this.parent ? this.parent.viewContainer(this) : this.viewContainer(this);
    if (!viewContainer) {
        return;
    }
    const factory = this.options.viewResolver.resolveComponentFactory(CompClass.MaterialComponent);
    const componentRef = viewContainer.createComponent(factory);
    (componentRef.instance as any).setInstance(this);
});

const setValue = CompClass.prototype.setValue;
CompClass.prototype.setValue = (function (...args) {
    if (this.materialComponent) {
        this.materialComponent.setValue(args[0]);
    }
    return setValue.call(this, ...args);
});

Components.addComponent('dropzone', HeaderComponent);