import {strictEqual, throws} from 'node:assert';
import {describe, it, mock} from 'node:test';

import {call$} from './low-level.util.mjs';


describe('call$', () => {

    it('is a function', () => void strictEqual(typeof call$, 'function'));

    it('calls the proper method and returns the result', () => {

        const name = 'fn';
        const fn = $ => $;
        const object = ({[name]: fn});
        const arg = Object.freeze({});

        mock.method(object, name);

        strictEqual(object[name].mock.calls.length, 0);
        const result = call$(object, name, arg);
        strictEqual(result, arg);

        strictEqual(object[name].mock.calls.length, 1);
        strictEqual(object[name].mock.calls[0].arguments[0], arg);
        strictEqual(object[name].mock.calls[0].this, object);

    });

    describe('throws an error', () => {
        it('if invalid object is provided', () => {
            throws(() => void call$(null));
        });

        it('if the property is not a function', () => {
            throws(() => void call$(Object.freeze({}), null));
        });

        it('if the property throws', () => {
            throws(() => {
                const k = 'thrower';
                const v = () => {
                    throw new Error('test error');
                };

                call$({[k]: v}, k);
            });
        });

    });

});

