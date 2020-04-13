const ExtensionUtils = imports.misc.extensionUtils;
const PopupMenu = imports.ui.popupMenu;
const Slider = imports.ui.slider;

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

        this.slider = new Slider.Slider(current / max);

        this.slider.connect('value-changed', (slider, value) => this._broadcastBrightness(value));

        this.actor = this.slider.actor;
    }

    setBrightness(percent) {
        this.slider.setValue(percent);
        this._broadcastBrightness(percent);
    }

    _normalizeValue(percent) {
        const value = percent * this.max;
        return Number(value.toFixed(0));
    }

    _broadcastBrightness(value) {
        if (this.timeout) {
            timer.clearTimeout(this.timeout);
        }
        this.timeout = timer.setTimeout(() => {
            const brightness = this._normalizeValue(value);
            log(`Set brightness ${brightness} on bus ${this.bus}`);
            ddcService.setDisplayBrightness(this.bus, brightness);
        }, 500);
    }
}

// eslint-disable-next-line no-unused-vars
var DisplaySlider = class DisplaySlider extends PopupMenu.PopupMenuSection {

    constructor(bus, name, current, max) {
        super(bus, name, current, max);

        const displayLabel = new PopupMenu.PopupMenuItem(name, {hover: false, reactive: false, can_focus: false, style_class: 'slider__label'});
        const displaySlider = new SliderItem(bus, current, max, {hover: false, reactive: false});

        this.addMenuItem(displayLabel);
        this.addMenuItem(displaySlider);

        this.slider = displaySlider;
    }

    setBrightness(percent) {
        this.slider.setBrightness(percent);
    }
};
