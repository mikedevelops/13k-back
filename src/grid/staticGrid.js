export const staticGrid = {
    resolution: [10, 10],
    tiles: [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],

    /**
     * Get entity at position in the grid
     * @param x
     * @param y
     * @return {number}
     */
    getEntityAt: function ([x, y]) {
        return this.tiles[(y * this.resolution[1]) + x];
    },

    /**
     * Can we move to this tile
     * @param x
     * @param y
     * @return {boolean}
     */
    canMoveToPosition: function ([x, y]) {
        switch (this.getEntityAt([x, y])) {
            case 1:
            case 4:
                return false;
            default:
                return true;
        }
    }
};
