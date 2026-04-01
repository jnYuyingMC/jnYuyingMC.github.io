import { __decorate } from "tslib";
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { style } from '@mdui/shared/icons/shared/style.js';
import { svgTag } from '@mdui/shared/icons/shared/svg-tag.js';
let IconHome = class IconHome extends LitElement {
    render() {
        return svgTag('<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>');
    }
};
IconHome.styles = style;
IconHome = __decorate([
    customElement('mdui-icon-home')
], IconHome);
export { IconHome };
