import * as _ from "./lamb/src/index";

export const split = _.generic(String.prototype.split);

export const splitBy = x => _.partial(split, [_.__, x]);
export const splitByDot = splitBy(".");
