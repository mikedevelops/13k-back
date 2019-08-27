import { tile } from './tile';
import { drawSprite, S_GROUND, S_POT, S_WALL } from '../sprite/sprites';
import { createItem } from '../items/item';
import { hiddenStage, STAGE_CTX } from '../stage/stage';
import { getUnit } from '../utils/units';

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
                const id = grid[(y * this.resolution[1]) + x];
                const position = [x, y];
                const entities = [];

                if (state[x] === undefined) {
                    state[x] = [];
                }

                if (id !== S_GROUND) {
                    entities.push(createItem(S_GROUND, position));
                }

                entities.push(createItem(id, position));
                state[x][y] = tile(x, y, entities);
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
        const tile = this.getTileAt([x, y]);

        if (tile === null) {
            return null;
        }

        const entity = tile.entities[tile.entities.length - 1];

        if (entity === undefined) {
            return null;
        }

        return entity;
    },

    /**
     * @param {number} x
     * @param {number} y
     * @return {number[]|null}
     */
    getTileAt: function ([x, y]) {
        const tile = this.currentState[x][y];

        if (this.currentState[x] === undefined) {
            return null;
        }

        if (this.currentState[x][y] === undefined) {
            return null;
        }

        return tile;
    },

    removeEntityAt: function (position) {
        const tile = this.getTileAt(position);

        if (tile === null) {
            return null;
        }

        tile.entities.pop();
    },

    addEntityAt: function (position, item) {
        const tile = this.getTileAt(position);

        if (tile === null) {
            return;
        }

        tile.entities.push(item);
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

        switch (entity.id) {
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

    draw: function () {
        STAGE_CTX.fillStyle = '#472d3c';
        STAGE_CTX.fillRect(0, 0, hiddenStage.width, hiddenStage.height);

        this.iterate(this.currentState, tile => {
            tile.entities.forEach(item => {
                drawSprite(
                    STAGE_CTX,
                    item.id,
                    getUnit(tile.position)
                );
            });
        });

        console.log(this.currentState);
    }

    // TODO: win condition method
});
