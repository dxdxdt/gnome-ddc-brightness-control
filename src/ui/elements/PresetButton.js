const St = imports.gi.St;
const ExtensionUtils = imports.misc.extensionUtils;
const Clutter = imports.gi.Clutter;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const CheckBox = imports.ui.checkBox;
const Lang = imports.lang;

const Me = ExtensionUtils.getCurrentExtension();
const ddcService = Me.imports.services.ddc;

class PresetButton extends PopupMenu.PopupMenuItem {

    constructor(value, handler) {
        super(`${(value*100).toFixed(0)}%`, {
            style_class: 'preset__item'
        });
        this.value = value;
        this.configureEvents(handler);
    }

    configureEvents(handler) {
        this.connect('activate', () => {
            if(handler) {
                handler(this.value);
            }
        })

    }
}
