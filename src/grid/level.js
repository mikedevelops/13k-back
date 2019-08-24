import { tile } from './tile';
import { S_POT, S_WALL } from '../sprite/sprites';

export const createLevel = () => ({
    resolution: [4, 4],
    currentState: null,
    cachedState: null,

    load: function (complete, start) {
        this.cachedState = this.createState(complete);
        this.currentState = this.createState(start);
    },

    createState: function (grid) {
        const state = [];
        let row = 0;
        let column = 0;

        for(let y = 0; y < this.resolution[1]; y++) {
            for (let x = 0; x < this.resolution[0]; x++) {
                if (state[x] === undefined) {
                    state[x] = [];
                }

                state[x][y] = tile(x, y, grid[(y * this.resolution[1]) + x]);
                column++;
            }

            row++;
        }

        return state;
    },

    /**
     * Get entity at position in the grid
     * @param x
     * @param y
     * @return {null|number}
     */
    getEntityAt: function ([x, y]) {
        const entities = this.getEntitiesAt([x, y]);

        if (entities === null) {
            return null;
        }

        return entities[entities.length - 1];
    },

    /**
     * @param {number} x
     * @param {number} y
     * @return {number[]|null}
     */
    getEntitiesAt: function ([x, y]) {
        const entity = this.currentState[x][y];

        if (this.currentState[x] === undefined) {
            return null;
        }

        if (this.currentState[x][y] === undefined) {
            return null;
        }

        if (!Array.isArray(entity)) {
            return [entity];
        }

        return entity;
    },

    /**
     * Can we move to this tile
     * @param x
     * @param y
     * @return {boolean}
     */
    canMoveToPosition: function ([x, y]) {
        const entity = this.getEntityAt([x, y]);

        if (entity === null) {
            return false;
        }

        switch (entity.entities[0]) {
            case S_WALL:
            case S_POT:
                return false;
            default:
                return true;
        }
    },

    iterate: function (state, tile) {
        for (let x = 0; x < this.resolution[0]; x++) {
            for (let y = 0; y < this.resolution[1]; y++) {
                tile(state[x][y]);
            }
        }
    },

    // TODO: win condition method
});
