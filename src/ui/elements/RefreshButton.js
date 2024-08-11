import GObject from 'gi://GObject';
import Clutter from 'gi://Clutter';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

// eslint-disable-next-line no-unused-vars
export const RefreshButton = GObject.registerClass(
class RefreshButton extends PopupMenu.PopupImageMenuItem {

    constructor(handler) {
        super('Reload displays', 'view-refresh-symbolic');
        this.configureEvents(handler);
    }

    configureEvents(handler) {
        this.connect('activate', () => {
            if (handler) {
                try {
                    handler();
                }
                finally {
                    return Clutter.EVENT_STOP;
                }
            }
        });
    }
});
