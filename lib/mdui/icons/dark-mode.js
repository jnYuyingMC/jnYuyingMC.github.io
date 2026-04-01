import { __decorate } from "tslib";
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { style } from '@mdui/shared/icons/shared/style.js';
import { svgTag } from '@mdui/shared/icons/shared/svg-tag.js';
let IconDarkMode = class IconDarkMode extends LitElement {
    render() {
        return svgTag('<path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>');
    }
};
IconDarkMode.styles = style;
IconDarkMode = __decorate([
    customElement('mdui-icon-dark-mode')
], IconDarkMode);
export { IconDarkMode };
