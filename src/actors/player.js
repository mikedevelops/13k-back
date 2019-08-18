import { drawSprite, S_PLAYER } from '../sprite/sprites';
import { getUnit } from '../utils/units';
import { addVector } from '../utils/vector';
import { STAGE_CTX } from '../stage/stage';
import { staticGrid } from '../grid/staticGrid';
import { entityManager } from '../index';

export const player = {
    /**
     * Player position
     */
    position: [0, 5],

    /**
     * Player's origin
     */
    origin: [0, 5],

    /**
     * Player move count
     */
    moves: 0,

    /**
     * Draw the player
     */
    draw: function () {
        drawSprite(STAGE_CTX, S_PLAYER, this.getWorldPosition());
    },

    /**
     * Get world position
     * @return {number[]}
     */
    getWorldPosition: function () {
        return this.position.map(p => getUnit(p));
    },

    /**
     * Update the player
     */
    update: function () {
        this.draw();
    },

    /**
     * @param {number[]} direction
     */
    move: function (direction) {
        const position = addVector(this.position, direction);

        if (!staticGrid.canMoveToPosition(position)) {
            return;
        }

        if (entityManager.getEntityAt(position) !== undefined) {
            return;
        }

        this.position = position;
    },
};
