import GLib from 'gi://GLib';

// eslint-disable-next-line no-unused-vars
export function setTimeout(func, millis, ...args) {

    let id = GLib.timeout_add(GLib.PRIORITY_DEFAULT, millis, () => {
        func(...args);
        return false; // Stop repeating
    });

    return id;
}

// eslint-disable-next-line no-unused-vars
export function clearTimeout(id) {
    GLib.Source.remove(id);
}
