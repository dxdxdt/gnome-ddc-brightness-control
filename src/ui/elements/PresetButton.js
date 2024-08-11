import GObject from 'gi://GObject';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

// eslint-disable-next-line no-unused-vars
export const PresetButton = GObject.registerClass(
class PresetButton extends PopupMenu.PopupMenuItem {

    constructor(value, handler) {
        super(`${(value * 100).toFixed(0)}%`, {
            style_class: 'preset__item'
        });
        this.value = value;
        this.configureEvents(handler);
    }

    configureEvents(handler) {
        this.connect('activate', () => {
            if (handler) {
                handler(this.value);
            }
        });

    }
});
