'use strict';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

import {BrightnessPanel} from './ui/Panel.js';

export default class DDCBrightnessControlExtension extends Extension {
    // constructor () {
    //     super();
    //     this._panel = null;

    //     // log(`Initializing ${this.name} version ${this.version}`);
    // }

    enable() {
        this._panel = new BrightnessPanel(this.getSettings());
        Main.panel.addToStatusArea(this.uuid, this._panel);
    }

    disable() {
        this._panel?.destroy();
        this._panel = null;
    }
};
