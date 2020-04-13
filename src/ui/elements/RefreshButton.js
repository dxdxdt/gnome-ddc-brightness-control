const ExtensionUtils = imports.misc.extensionUtils;
const Clutter = imports.gi.Clutter;
const PopupMenu = imports.ui.popupMenu;

const Me = ExtensionUtils.getCurrentExtension();
const ddcService = Me.imports.services.ddc;

// eslint-disable-next-line no-unused-vars
var RefreshButton = class RefreshButton extends PopupMenu.PopupImageMenuItem {

    constructor(handler) {
        super('Reload displays', 'view-refresh-symbolic');
        this.configureEvents(handler);
    }

    configureEvents(handler) {
        this.connect('activate', () => {
            if (handler) {
                const displays = ddcService.getDisplays();
                log('Button handler displays', displays);
                handler(displays);
                return Clutter.EVENT_STOP;
            }
        });
    }
};
