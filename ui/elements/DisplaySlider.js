const St = imports.gi.St;
const ExtensionUtils = imports.misc.extensionUtils;
const Clutter = imports.gi.Clutter;
const GObject = imports.gi.GObject;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const CheckBox = imports.ui.checkBox;
const Slider = imports.ui.slider;
const Lang = imports.lang;

const Me = ExtensionUtils.getCurrentExtension();
const ddcService = Me.imports.services.ddc;
const timer = Me.imports.services.timer;

class SliderItem extends PopupMenu.PopupBaseMenuItem {
    constructor(bus, current, max, params) {
        super(params);

        this.bus = bus;
        this.current = current;
        this.max = max;
        this.timeout = null;
        this.treshold = 5;

        const slider = new Slider.Slider(current / max);

        slider.connect('value-changed', (slider, value) => {
            if (this.timeout) {
                timer.clearTimeout(this.timeout);
            }
            this.timeout = timer.setTimeout(() => {
                const brightness = this.normalizeValue(value)
                if (Math.abs(brightness - this.current) > this.treshold) {
                    log(`Set brightness ${brightness} on bus ${this.bus}`)
                    ddcService.setDisplayBrightness(this.bus, brightness);
                }
            }, 500)

        })

        this.actor = slider.actor;
    }

    normalizeValue(percent) {
        const value = percent * this.max
        return Number(value.toFixed(0))
    }

};

class DisplaySlider extends PopupMenu.PopupMenuSection {

    constructor(bus, name, current, max) {
        super(bus, name, current, max);

        const displayLabel = new PopupMenu.PopupMenuItem(name, {hover: false, reactive: false, can_focus: false});
        const displaySlider = new SliderItem(bus, current, max, {hover: false, reactive: false});

        this.addMenuItem(displayLabel);
        this.addMenuItem(displaySlider);
    }

    onUpdate(value) {
        log(`${value}`);
    }

}
