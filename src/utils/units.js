import { UNIT } from '../game/constants';

export const getUnit = x => {
    if (Array.isArray(x)) {
        return [x[0] * UNIT, x[1] * UNIT];
    }
    return x * UNIT;
};

export const randInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
