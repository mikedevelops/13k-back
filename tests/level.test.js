import { createLevel } from '../src/grid/level';

describe('Level', () => {
    let grid;

    beforeEach(() => {
        grid = createLevel();
        grid.resolution = [4, 4];
        grid.tiles = [
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, [1, 2, 3, 10], 11, 12,
            13, 14, 15, 16
        ];
    });

    const provider = [
        [0, 0, 1],
        [1, 0, 2],
        [2, 0, 3],
        [3, 0, 4],
        [0, 1, 5],
        [1, 1, 6],
        [2, 1, 7],
        [3, 1, 8],
        [0, 2, 9],
        [1, 2, 10],
        [2, 2, 11],
        [3, 2, 12],
        [0, 3, 13],
        [1, 3, 14],
        [2, 3, 15],
        [3, 3, 16],
    ];

    provider.forEach(([x, y, tile]) => {
        test('should get an entity at position', () => {
            expect(grid.getEntityAt([x, y])).toEqual(tile);
        });
    });

    describe('createState', () => {
        test('should create a state object', () => {
            const level = createLevel();

            level.resolution = [3, 3];
            const state = level.createState([1, 2, [1, 2, 3], 4, 5, 6, 7, 8, 9]);

            expect(state[0][0]).toEqual({ position: [0, 0], entities: [1] });
            expect(state[1][0]).toEqual({ position: [1, 0], entities: [2] });
            expect(state[2][0]).toEqual({ position: [2, 0], entities: [1, 2, 3] });
            expect(state[0][1]).toEqual({ position: [0, 1], entities: [4] });
            expect(state[1][1]).toEqual({ position: [1, 1], entities: [5] });
            expect(state[2][1]).toEqual({ position: [2, 1], entities: [6] });
            expect(state[0][2]).toEqual({ position: [0, 2], entities: [7] });
            expect(state[1][2]).toEqual({ position: [1, 2], entities: [8] });
            expect(state[2][2]).toEqual({ position: [2, 2], entities: [9] });
        });
    });
});
