const GLib = imports.gi.GLib;

// eslint-disable-next-line no-unused-vars
function exec(cmd) {
    try {
        let [, out] = GLib.spawn_command_line_sync(cmd);
        const response = out.toString();
        return response;
    } catch (err) {
        return null;
    }
}

// eslint-disable-next-line no-unused-vars
function execAsync(cmd) {
    try {
        let [, out] = GLib.spawn_command_line_async(cmd);
        const response = out.toString();
        return response;
    } catch (err) {
        return null;
    }
}
