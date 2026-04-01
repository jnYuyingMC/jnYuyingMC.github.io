import { __decorate } from "tslib";
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { style } from '@mdui/shared/icons/shared/style.js';
import { svgTag } from '@mdui/shared/icons/shared/svg-tag.js';
let IconNavigation = class IconNavigation extends LitElement {
    render() {
        return svgTag('<path d="M12 2 4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>');
    }
};
IconNavigation.styles = style;
IconNavigation = __decorate([
    customElement('mdui-icon-navigation')
], IconNavigation);
export { IconNavigation };
