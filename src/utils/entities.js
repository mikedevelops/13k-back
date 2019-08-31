import {S_DOORWAY, S_DOORWAY_EXIT} from '../sprite/sprites';

export const entityArraysEqual = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length)
        return false;

    const arr1 = a.concat().sort();
    const arr2 = b.concat().sort();

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].id === S_DOORWAY && arr2[i].id === S_DOORWAY_EXIT)
            continue;

        if (arr1[i].id !== arr2[i].id)
            return false;
    }

    return true;
};
