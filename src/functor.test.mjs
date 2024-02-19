import {strictEqual} from 'node:assert';
import {describe, it} from 'node:test';

import {Box} from './high-level.util.mjs';


describe('Box', () => {

    describe('has static `_`', () => {
        it('which is a Symbol', () => void strictEqual(typeof Box._, 'symbol'));
    });

    describe('has static `of`', () => {

        it('which is a function', () => void strictEqual(typeof Box.of, 'function'));

        it('creates an instance of the proper type', () => {

            const o = Object.freeze({});
            const f = Box.of(o);

            strictEqual(f instanceof Box, true);

            class Extension extends Box {
            }

            const x = Extension.of(o);

            strictEqual(x instanceof Extension, true);
        });

        it('creates a new instance', () => {

            const a = Box.of();
            const b = Box.of();

            strictEqual(!!a, true);
            strictEqual(!!b, true);
            strictEqual(a !== b, true);

        });

        it('stores the value in `_`', () => {

            const o = Object.freeze({});
            const f = Box.of(o);

            class Extension extends Box {
            }

            const x = Extension.of(o);

            strictEqual(o, f[Box._]);
            strictEqual(o, x[Box._]);

        });

    });

});

