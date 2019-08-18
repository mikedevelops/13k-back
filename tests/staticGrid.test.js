import { staticGrid } from '../src/grid/staticGrid';

describe('Static Grid', () => {
    let grid;

    beforeEach(() => {
        grid = Object.assign({}, staticGrid);
        grid.resolution = [4, 4];
        grid.tiles = [
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
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
});
