import {I_ACTION, I_MOVE_EAST, I_MOVE_SOUTH, I_MOVE_WEST} from "../instructions/instructions";

export const levels = [
    {
        instructions: [
            I_MOVE_EAST,
            I_MOVE_SOUTH,
            I_ACTION,
            I_MOVE_WEST,
            I_MOVE_WEST,
            I_MOVE_SOUTH,
            I_ACTION,
            I_MOVE_EAST,
            I_MOVE_EAST,
            I_MOVE_EAST,
        ],
        resolution: [4, 4],
        hero: [1, 1],
        player: [1, 1],
        intro: [1, 1, 1, 1, 1, 0, 0, 12, 1, 0, [11, 9], 1, 1, 1, 1, 1],
        complete: [1, 1, 1, 1, 1, 0, 0, 4, 1, 0, [11, 9], 1, 1, 1, 1, 1],
        start: [1, 1, 1, 1, 1, 0, 0, 4, 1, 9, 11, 1, 1, 1, 1, 1],
    },
];
