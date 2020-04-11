/**
 * Taken from: https://github.com/optimisme/gjs-examples/blob/master/assets/timers.js
 */

const Mainloop = imports.mainloop;

const setTimeout = function(func, millis /* , ... args */) {

    let args = [];
    if (arguments.length > 2) {
        args = args.slice.call(arguments, 2);
    }

    let id = Mainloop.timeout_add(millis, () => {
        func.apply(null, args);
        return false; // Stop repeating
    }, null);

    return id;
};

const clearTimeout = function(id) {
    Mainloop.source_remove(id);
};
