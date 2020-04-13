/**
 * Taken from: https://github.com/optimisme/gjs-examples/blob/master/assets/timers.js
 */

const Mainloop = imports.mainloop;

// eslint-disable-next-line no-unused-vars
function setTimeout(func, millis, ...args) {

    let id = Mainloop.timeout_add(millis, () => {
        func(...args);
        return false; // Stop repeating
    }, null);

    return id;
}

// eslint-disable-next-line no-unused-vars
function clearTimeout(id) {
    Mainloop.source_remove(id);
}
