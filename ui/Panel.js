const St = imports.gi.St;
const ExtensionUtils = imports.misc.extensionUtils;
const Clutter = imports.gi.Clutter;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const CheckBox = imports.ui.checkBox;
const Lang = imports.lang;

const Me = ExtensionUtils.getCurrentExtension();
const ddcService = Me.imports.services.ddc;
const {RefreshButton} = Me.imports.ui.elements.RefreshButton;
const {DisplaySlider} = Me.imports.ui.elements.DisplaySlider;

var BrightnessPanel = new Lang.Class({
    Name: 'BrightnessPanel',
    Extends: PanelMenu.Button,

    _init: function() {
        this.parent(1, 'BrightnessPanel', false);

        const box = new St.BoxLayout();
        const icon =  new St.Icon({ icon_name: 'display-brightness-symbolic', style_class: 'system-status-icon'});
        const toplabel = new St.Label({ text: ' Brightness ', y_expand: true, y_align: Clutter.ActorAlign.CENTER });

        box.add(icon);
        box.add(toplabel);
        box.add(PopupMenu.arrowIcon(St.Side.BOTTOM));

        this.actor.add_child(box);

        this.reloadButton = new RefreshButton( (displays) => this.reloadDisplays(displays));
        this.displaysSection = new PopupMenu.PopupMenuSection();

        this.drawMenu();

    },

    destroy() {
        this.parent();
    },

    drawMenu () {
        this.menu.addMenuItem(this.reloadButton);
        this.reloadDisplays()
    },

    reloadDisplays (displays) {
        this.displaysSection.destroy();
        this.displaysSection = new PopupMenu.PopupMenuSection();
        if(displays) {
            log('Displays exists, adding')
            for(const display of displays) {
                this.displaysSection.addMenuItem(new DisplaySlider(display.bus, `${display.name} : ${display.serialNumber}`, display.current, display.max));
                this.displaysSection.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
            }
        }

        this.menu.addMenuItem(this.displaysSection);
    }

});
