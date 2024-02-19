import {El} from './high-level.util.mjs';
import {any2str, s2el$, tie} from './low-level.util.mjs';


const display = El.of(s2el$('#display')).set({k: 'value', v: 0});


const onKeyUp = (el, ev) => {
    if (ev?.isComposing || 229 === ev?.keyCode) {
        return;
    }

    const v = any2str(ev?.key);

    if (/\d/u.test(v)) {
        el.append({k: 'value', v});
    }

    if (v === 'Backspace' || v === 'Delete') {
        el.set({k: 'value', v: 0});
    }

};

const onClick = (el, ev) => {

    const digit = any2str(ev?.target?.dataset?.digit);
    const op = any2str(ev?.target?.dataset?.op);

    el.append({k: 'value', v: digit});

    if (op === 'delete') {
        el.set({k: 'value', v: 0});
    }

};

const onDisplayKeyUp = tie(onKeyUp, display);
const onButtonClick = tie(onClick, display);

console.log(onDisplayKeyUp?.name, onButtonClick?.name);

El
    .of(s2el$('body'))
    .on({k: 'keyup', v: onDisplayKeyUp})
    .on({k: 'click', v: onButtonClick});
