import St from 'gi://St';
import Clutter from 'gi://Clutter';
import GObject from 'gi://GObject';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import {RefreshButton} from './elements/RefreshButton.js';
import {DisplaySlider} from './elements/DisplaySlider.js';
import {PresetButton} from './elements/PresetButton.js';
import * as ddcService from '../services/ddc.js';

// eslint-disable-next-line no-unused-vars
export const BrightnessPanel = GObject.registerClass(
class BrightnessPanel extends PanelMenu.Button {
    constructor(settings) {
        super(1, 'BrightnessPanel', false);

        this.displays = null;
        this.settings = settings;
        this.showIconOnly = this.settings.get_value('show-icon-only').deep_unpack();

        const box = new St.BoxLayout();
        const icon =  new St.Icon({icon_name: 'display-brightness-symbolic', style_class: 'system-status-icon'});
        this.toplabel = new St.Label({text: this.showIconOnly ? '' : ' Brightness ', y_expand: true, y_align: Clutter.ActorAlign.CENTER});

        this.onShowIconOnlyChange = this.settings.connect(
            'changed::show-icon-only',
            this._onShowIconOnlyChange.bind(this)
        );

        box.add_child(icon);
        box.add_child(this.toplabel);
        box.add_child(PopupMenu.arrowIcon(St.Side.BOTTOM));
        this.add_child(box);

        this.reloadButton = new RefreshButton(() => this.reloadDisplays());
        this.displaysSection = new PopupMenu.PopupMenuSection();
        this.buttonsSection = new PopupMenu.PopupSubMenuMenuItem('Presets');

        this.drawMenu();

    }

    _onShowIconOnlyChange() {
        this.showIconOnly = this.settings.get_value('show-icon-only').deep_unpack();
        this.toplabel.text = this.showIconOnly ? '' : ' Brightness ';
    }

    destroy() {
        this.parent();
    }

    drawMenu() {
        this.menu.addMenuItem(this.reloadButton);
        this.reloadDisplays();
    }

    setGroupBrightness(percentage) {
        this.sliders.map(display => {
            return display.setBrightness(percentage);
        });
    }

    async reloadDisplays() {
        // log('Button handler displays', displays);

        this.sliders = [];

        this.displaysSection.destroy();
        this.buttonsSection.destroy();

        this.displaysSection = new PopupMenu.PopupMenuSection();
        this.buttonsSection = new PopupMenu.PopupMenuSection();


        try {
            const displays = await ddcService.getDisplays();

            if (displays) {
                for (const display of displays) {
                    const slider = new DisplaySlider(display.bus, `${display.name} : ${display.serialNumber}`, display.current, display.max);
                    this.sliders.push(slider);
                    this.displaysSection.addMenuItem(slider);
                }

                this.buttonPreset = new PopupMenu.PopupSubMenuMenuItem('Presets');

                for (let i = 0.1; i < 1; i += 0.1) {
                    this.buttonPreset.menu.addMenuItem(new PresetButton(i, value => this.setGroupBrightness(value)));
                }
                this.buttonsSection.addMenuItem(this.buttonPreset);

                this.menu.addMenuItem(this.displaysSection);
                this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
                this.menu.addMenuItem(this.buttonsSection);
            }
        }
        catch (e) {
            log(e);
            throw e;
        }
    }

});
