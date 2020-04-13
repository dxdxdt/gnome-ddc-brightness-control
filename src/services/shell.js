const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Clutter = imports.gi.Clutter;

function exec(cmd) {
    try {
        let [res, out] = GLib.spawn_command_line_sync(cmd);
        const response = out.toString();
        return response;
    } catch (err) {
        return null;
    }
}

function execAsync(cmd) {
    try {
        let [res, out] = GLib.spawn_command_line_async(cmd);
        const response = out.toString();
        return response;
    } catch (err) {
        return null;
    }
}
