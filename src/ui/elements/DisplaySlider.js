import GObject from 'gi://GObject';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import * as Slider from 'resource:///org/gnome/shell/ui/slider.js';

import * as ddcService from '../../services/ddc.js';
import * as timer from '../../services/timer.js';

const SliderItem = GObject.registerClass(
class SliderItem extends PopupMenu.PopupBaseMenuItem {
    constructor(bus, current, max, params) {
        super(params);

        this.bus = bus;
        this.current = current;
        this.max = max;
        this.timeout = null;
        this.treshold = 5;

        // {track_hover: true} could be used, but the interface does not expose
        // it.
        this.slider = new Slider.Slider(current / max);
        this.slider.connect('drag-end', (...args) => this._broadcastBrightness(this.slider.value));
        this.slider.connect('destroy', (...args) => {
            if (this.timeout) {
                timer.clearTimeout(this.timeout);
            }
        });
        this.add_child(this.slider);
    }

    setBrightness(percent) {
        this.slider.value = percent;
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
});

// eslint-disable-next-line no-unused-vars
export class DisplaySlider extends PopupMenu.PopupMenuSection {

    constructor(bus, name, current, max) {
        super(bus, name, current, max);

        const displayLabel = new PopupMenu.PopupMenuItem(name, {can_focus: false, reactive: false, style_class: 'slider__label'});
        const displaySlider = new SliderItem(bus, current, max, {});

        this.addMenuItem(displayLabel);
        this.addMenuItem(displaySlider);

        this.slider = displaySlider;
    }

    setBrightness(percent) {
        this.slider.setBrightness(percent);
    }
};
