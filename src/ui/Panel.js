const St = imports.gi.St;
const ExtensionUtils = imports.misc.extensionUtils;
const Clutter = imports.gi.Clutter;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Gio = imports.gi.Gio;

const Me = ExtensionUtils.getCurrentExtension();

const {RefreshButton} = Me.imports.ui.elements.RefreshButton;
const {DisplaySlider} = Me.imports.ui.elements.DisplaySlider;
const {PresetButton} = Me.imports.ui.elements.PresetButton;

// eslint-disable-next-line no-unused-vars
var BrightnessPanel = class BrightnessPanel extends PanelMenu.Button {

    constructor() {
        super(1, 'BrightnessPanel', false);

        this.displays = null;

        const gschema = Gio.SettingsSchemaSource.new_from_directory(
            Me.dir.get_child('schemas').get_path(),
            Gio.SettingsSchemaSource.get_default(),
            false
        );

        this.settings = new Gio.Settings({settings_schema: gschema.lookup('bgornicki.ddc.brightness.control', true)});
        this.showIconOnly = this.settings.get_value('show-icon-only').deep_unpack();

        const box = new St.BoxLayout();
        const icon =  new St.Icon({icon_name: 'display-brightness-symbolic', style_class: 'system-status-icon'});
        this.toplabel = new St.Label({text: this.showIconOnly ? '' : ' Brightness ', y_expand: true, y_align: Clutter.ActorAlign.CENTER});

        this.onShowIconOnlyChange = this.settings.connect(
            'changed::show-icon-only',
            this._onShowIconOnlyChange.bind(this)
        );

        box.add(icon);
        box.add(this.toplabel);
        box.add(PopupMenu.arrowIcon(St.Side.BOTTOM));

        this.actor.add_child(box);

        this.reloadButton = new RefreshButton(displays => this.reloadDisplays(displays));
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

    reloadDisplays(displays) {
        this.sliders = [];

        this.displaysSection.destroy();
        this.buttonsSection.destroy();

        this.displaysSection = new PopupMenu.PopupMenuSection();
        this.buttonsSection = new PopupMenu.PopupMenuSection();

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

};
