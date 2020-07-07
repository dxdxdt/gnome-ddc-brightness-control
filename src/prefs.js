/* eslint-disable no-invalid-this */
'use strict';

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

function init() {
}

function buildPrefsWidget() {

    let gschema = Gio.SettingsSchemaSource.new_from_directory(
        Me.dir.get_child('schemas').get_path(),
        Gio.SettingsSchemaSource.get_default(),
        false
    );

    this.settings = new Gio.Settings({
        settings_schema: gschema.lookup('bgornicki.ddc.brightness.control', true)
    });

    // Create a parent widget that we'll return from this function
    let prefsWidget = new Gtk.Grid({
        margin: 18,
        column_spacing: 12,
        row_spacing: 12,
        visible: true
    });

    let title = new Gtk.Label({
        // eslint-disable-next-line prefer-template
        label: '<b>' + Me.metadata.name + ' Extension Preferences</b>',
        halign: Gtk.Align.START,
        use_markup: true,
        visible: true
    });

    prefsWidget.attach(title, 0, 0, 2, 1);

    // Create a label & switch for `show-icon-only`
    let toggleLabel = new Gtk.Label({
        label: 'Hide Brightness word, show icon only',
        halign: Gtk.Align.START,
        visible: true
    });

    prefsWidget.attach(toggleLabel, 0, 2, 1, 1);

    let toggle = new Gtk.Switch({
        active: this.settings.get_boolean('show-icon-only'),
        halign: Gtk.Align.END,
        visible: true
    });

    prefsWidget.attach(toggle, 1, 2, 1, 1);

    // Bind the switch to the `show-icon-only` key
    this.settings.bind(
        'show-icon-only',
        toggle,
        'active',
        Gio.SettingsBindFlags.DEFAULT
    );

    // Return our widget which will be added to the window
    return prefsWidget;
}
