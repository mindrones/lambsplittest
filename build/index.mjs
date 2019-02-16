var __ = {};

var generic = Function.bind.bind(Function.call);

function _curry2 (fn, isRightCurry) {
    return function (a) {
        return function (b) {
            return isRightCurry ? fn.call(this, b, a) : fn.call(this, a, b);
        };
    };
}

function clamp (n, min, max) {
    n = +n;
    min = +min;
    max = +max;
    if (min > max) {
        return NaN;
    } else {
        return n < min ? min : n > max ? max : n;
    }
}

var MAX_ARRAY_LENGTH = 4294967295;

function _toArrayLength (value) {
    return clamp(value, 0, MAX_ARRAY_LENGTH) >>> 0;
}

function map (arrayLike, iteratee) {
    var len = _toArrayLength(arrayLike.length);
    var result = Array(len);
    for (var i = 0; i < len; i++) {
        result[i] = iteratee(arrayLike[i], i, arrayLike);
    }
    return result;
}

var mapWith = _curry2(map, true);

function partial (fn, args) {
    return function () {
        if (!Array.isArray(args)) {
            return fn.apply(this, arguments);
        }
        var lastIdx = 0;
        var newArgs = [];
        var argsLen = args.length;
        for (var i = 0, boundArg; i < argsLen; i++) {
            boundArg = args[i];
            newArgs[i] = boundArg === __ ? arguments[lastIdx++] : boundArg;
        }
        for (var len = arguments.length; lastIdx < len; lastIdx++) {
            newArgs[i++] = arguments[lastIdx];
        }
        return fn.apply(this, newArgs);
    };
}

function getIn (obj, key) {
    return obj[key];
}

var getKey = _curry2(getIn, true);

const mapWithA = mapWith(getKey("a"));

const split = generic(String.prototype.split);
const splitBy = x => partial(split, [__, x]);
const splitByDot = splitBy(".");

export { mapWithA, split, splitBy, splitByDot };
