const any2str = $ => null === $ || (void 1) === $ || Number.isNaN($) ? '' : String($);

const s2el$ = $ => document.querySelector($);

const tie = ($, ...$$) => {

    const fn = $.bind(null, ...$$);
    const value = `${$?.name ?? '<anonymous>'}(${$$.map(String)})`;

    Object.defineProperty(fn, 'name', {value});

    return fn;
};

const call$ = (object, name, ...args) => {
    if (null === object || object === void 1) {
        throw new TypeError(`call$(): ${String(object)} is not an object`);
    }

    if ('function' !== typeof object[name]) {
        throw new TypeError(`call$(): ${String(name)} is not a function`);
    }

    return object[name](...args);

};


export {call$, any2str, s2el$, tie};
