import {tile} from './tile';
import {drawSprite, S_DOORWAY, S_DOORWAY_EXIT, S_GROUND, S_GROUND_TILE, S_POT, S_WALL} from '../sprite/sprites';
import {createItem} from '../items/item';
import {stage, STAGE_CTX} from '../stage/stage';
import {getUnit} from '../utils/units';
import {entityArraysEqual} from "../utils/entities";

export const createLevel = () => ({
    resolution: [4, 4],
    currentState: null,
    cachedState: null,
    countdown: 1,
    active: false,
    exitPosition: null,
    exitOpen: false,
    finished: false,
    playerStartPosition: null,
    cachedStartState: null,

    reset: function () {
        this.currentState = this.cachedStartState;
        this.exitOpen = false;
    },

    load: function (complete, start, player) {
        this.cachedState = this.createState(complete);
        this.cachedStartState = this.createState(start);
        this.currentState = this.createState(start);
        this.playerStartPosition = player;
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
                const bottomTile = Array.isArray(id) ? id[0] : id;
                const topTile = Array.isArray(id) ? id[id.length - 1] : id;

                if (state[x] === undefined) {
                    state[x] = [];
                }

                switch (bottomTile) {
                  case S_GROUND:
                  case S_GROUND_TILE:
                    break;
                  default:
                    entities.push(createItem(S_GROUND, position));
                }

                if (topTile === S_DOORWAY) {
                    this.exitPosition = position;
                }

                if (Array.isArray(id)) {
                  id.forEach(i => entities.push(createItem(i, position)))
                } else {
                  entities.push(createItem(id, position));
                }

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
     * @param state
     * @return {number[]|null}
     */
    getTileAt: function ([x, y], state = this.currentState) {
        const tile = state[x][y];

        if (state[x] === undefined) {
            return null;
        }

        if (state[x][y] === undefined) {
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

    replaceEntityAt: function (position, entity) {
        const tile = this.getTileAt(position);

        if (tile === null) {
            return null;
        }

        tile.entities[tile.entities.length - 1] = entity;
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
            case S_DOORWAY:
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

    draw: function (state = this.currentState) {

        this.iterate(state, tile => {
            tile.entities.forEach(item => {
                drawSprite(
                    STAGE_CTX,
                    item.id,
                    getUnit(tile.position)
                );
            });
        });
    },

    intro: function () {
        this.draw(this.cachedState);

        const interval = setInterval(() => {
            if (this.countdown === 0) {
                const event = new CustomEvent('start');

                clearInterval(interval);
                this.active = true;
                stage.dispatchEvent(event);
                return;
            }

            const event = new CustomEvent('countdown');
            event.data = this.countdown;
            stage.dispatchEvent(event);
            this.countdown--;
        }, 1000);
    },

    update: function () {
        this.draw(this.currentState)
    },

    isComplete: function () {
        let complete = true;

        this.iterate(this.currentState, tile => {
            if (!complete) {
                return;
            }

            const cachedTile = this.getTileAt(tile.position, this.cachedState);

            if (!entityArraysEqual(cachedTile.entities, tile.entities)) {
                complete = false;
            }
        });

        return complete;
    },

    complete: function () {
        if (this.exitOpen) {
            return;
        }

        const exit = createItem(S_DOORWAY_EXIT, this.exitPosition);

        this.replaceEntityAt(exit.position, exit);
        this.exitOpen = true;

        const event = new CustomEvent('open_exit');
        stage.dispatchEvent(event);
    },

    inComplete: function () {
        if (!this.exitOpen) {
            return;
        }

        const exit = createItem(S_DOORWAY, this.exitPosition);

        this.replaceEntityAt(exit.position, exit);
        this.exitOpen = false;

        const event = new CustomEvent('close_exit');
        stage.dispatchEvent(event);
    }

    // TODO: win condition method
});
