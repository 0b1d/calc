import {call$} from './low-level.util.mjs';


/**
 * u['fantasy-land/map'](a => a) is equivalent to u (identity)
 * u['fantasy-land/map'](x => f(g(x))) is equivalent to u['fantasy-land/map'](g)['fantasy-land/map'](f) (composition)
 *
 * fantasy-land/map method
 * fantasy-land/map :: Functor f => f a ~> (a -> b) -> f b
 */


class Box {

    static _ = Symbol('_');

    //:: Applicative F => a -> F a
    static of($) {
        const f = new this();
        f[Box._] = $;
        return f;
    }

    //:: Functor F => F a ~> (a -> b) -> F b
    map($) {
        if ('function' !== typeof $) {
            throw new TypeError(`Functor.map(): ${String($)} is not a function`);
        }

        return this.constructor.of($(this[Box._]));
    }
}


class El extends Box {

    call = (key, ...args) => this.map($ => call$($, key, ...args));

    get = ({k}) => this.map($ => $?.[k]);

    set = ({k, v}) => this.map($ => {
        $[k] = v;
        return $;
    });

    append = ({k, v}) => this.map($ => {
        if (v) {
            $[k] = $[k] + v;
        }
        return $;
    });

    on = ({k, v}) => this.map($ => {
        $.addEventListener(k, v);
        return $;
    });

    off = ({k, v}) => this.map($ => {
        $.removeEventListener(k, v);
        return $;
    });
}


export {call$, Box, El} ;
