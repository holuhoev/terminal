import { complement, pipe, isNil, prop } from "ramda";

const notNil = complement(isNil);

export const hasPoint = pipe(prop('pointId'), notNil);