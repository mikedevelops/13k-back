export const addVector = (a, b) => {
    return [a[0] + b[0], a[1] + b[1]];
};

export const subtractVector = (a, b) => {
    return [a[0] - b[0], a[1] - b[1]];
};

export const equals = (a, b) => a[0] === b[0] && a[1] === b[1];
