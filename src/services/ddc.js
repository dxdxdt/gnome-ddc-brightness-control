import * as shell from './shell.js';

// eslint-disable-next-line no-unused-vars
export async function getDisplays() {

    const result = (await shell.exec('ddcutil detect --brief'))[0];
    // lines that do not start with a whitespace
    const entries = result.split(/^[^\s].*$/gim);
    const displays = [];
    let i;

    for (i = 0; i < entries.length; i += 1) {
        if (!entries[i] || !entries[i].trim()) {
            continue;
        }
        const lines = entries[i].split('\n');
        let bus, monitor, name, serialNumber;

        lines.forEach (l => {
            l = l.trim();
            const sep = l.search(':');

            if (sep < 0) {
                return;
            }
            switch (l.substring(0, sep).toLowerCase()) {
            case "i2c bus":
                bus = l.substring(l.search(/(\d+)$/));
                 break;
            case "monitor": monitor = l.substring(sep + 1); break;
            }
        });

        if (!bus) {
            continue;
        }
        if (monitor) {
            try {
                // trying getting the brightness of an "invalid display" will
                // throw
                const {current, max} = await getDisplayBrightness(bus);
                const arr = monitor.split(':');

                name = arr[1] || bus;
                serialNumber = arr[2] || "";

                displays.push({ bus, name, serialNumber, current, max });
            }
            catch (e) {}
        }
    };

    return displays;
}

export async function getDisplayBrightness(bus) {
    const result = (await shell.exec(`ddcutil getvcp 10 --bus ${bus} --brief`))[0].split(' ');

    return {
        current: result[3],
        max: result[4]
    };
}

// eslint-disable-next-line no-unused-vars
export async function setDisplayBrightness(bus, value) {
    const result = await shell.exec(`ddcutil setvcp 10 ${value} --bus ${bus}`);
    // log(result);
}
