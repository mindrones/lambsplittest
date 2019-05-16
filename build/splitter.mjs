var __ = {};

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

var generic = Function.bind.bind(Function.call);

const split = generic(String.prototype.split);
const splitBy = x => partial(split, [__, x]);
const splitByDot = splitBy(".");

export { split, splitBy, splitByDot };
