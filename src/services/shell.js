import Gio from 'gi://Gio';

// eslint-disable-next-line no-unused-vars
export async function exec(cmd) {
    // log(cmd); // TODO: comment out
    const proc = Gio.Subprocess.new(
        cmd.split(/\s+/),
        Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE);

    const ret = await proc.communicate_utf8(null, null);

    if (proc.get_successful()) {
        return ret.slice(1);
    }

    throw new Error(ret);
}
