'use strict';

const St = imports.gi.St;
const ExtensionUtils = imports.misc.extensionUtils;
const Clutter = imports.gi.Clutter;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Main = imports.ui.main;
const CheckBox = imports.ui.checkBox;
const Lang = imports.lang;

const Me = ExtensionUtils.getCurrentExtension();
const Panel = Me.imports.ui.Panel;

let panel;

function init() {
    log(`initializing ${Me.metadata.name} version ${Me.metadata.version}`);
}

function enable() {
    panel = new Panel.BrightnessPanel;
    Main.panel.addToStatusArea('PopupMenuExample', panel, 0, 'right');
}

function disable() {
    button.destroy();
}
