/* eslint-disable no-invalid-this */
import Gio from 'gi://Gio';
import Adw from 'gi://Adw';

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class DDCBrightnessControlExtension extends ExtensionPreferences {
    fillPreferencesWindow (window) {
        const page = new Adw.PreferencesPage({
            title: _('General'),
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);

        const toggle = new Adw.SwitchRow({
            title: _('Show icon only'),
            subtitle: _('Hide Brightness word, show icon only'),
        });
        page.add(toggle);

        window._settings = this.getSettings();
        window._settings.bind('show-icon-only', toggle, 'active',
            Gio.SettingsBindFlags.DEFAULT);
    }
}
