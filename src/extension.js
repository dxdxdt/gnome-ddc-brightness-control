'use strict';

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;

const Me = ExtensionUtils.getCurrentExtension();
const Panel = Me.imports.ui.Panel;

let panel;

function init() {
    log(`initializing ${Me.metadata.name} version ${Me.metadata.version}`);
}

function enable() {
    panel = new Panel.BrightnessPanel();
    Main.panel.addToStatusArea('PopupMenuExample', panel, 0, 'right');
}

function disable() {
    panel.destroy();
}
