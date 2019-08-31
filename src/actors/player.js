import {clearSprite, drawSprite, PLAYER_SPRITE_MAP, S_DOORWAY_EXIT} from '../sprite/sprites';
import { getUnit } from '../utils/units';
import { addVector, equals, V_EAST } from '../utils/vector';
import { STAGE_CTX } from '../stage/stage';

export const createPlayer = (inventory) => ({
    /**
     * Player inventory
     */
    inventory: inventory,
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
     * Player direction
     */
    direction: V_EAST,
    /**
     * Should the player be hidden
     */
    hide: false,

    /**
     * Draw the player
     */
    draw: function () {
        drawSprite(
            STAGE_CTX,
            PLAYER_SPRITE_MAP[this.direction],
            this.getWorldPosition()
        );
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
    update: function (position = this.position) {
        this.position = position;
        this.inventory.draw();
        this.draw();
    },

    isFull: function () {
        return this.item !== null;
    },

    /**
     * @param {object} level
     * @param {number[]} direction
     */
    move: function (level, direction) {
        if (!equals(direction, this.direction)) {
            this.direction = direction;
            return;
        }

        const position = addVector(this.position, direction);

        if (!level.canMoveToPosition(position)) {
            return;
        }

        const entity = level.getEntityAt(position);

        this.direction = direction;
        this.position = position;

        if (entity.id === S_DOORWAY_EXIT) {
            const event = new CustomEvent('player_exit');
            stage.dispatchEvent(event);
        }
    },

    pickup: function (level) {
        const itemPosition = addVector(this.position, this.direction);
        const item = level.getEntityAt(itemPosition);

        if (item === null) {
            return;
        }

        if (!item.canPickup()) {
            return;
        }

        level.removeEntityAt(itemPosition);
        this.inventory.addItem(item);
    },

    place: function (level) {
        const targetPosition = addVector(this.position, this.direction);
        const item = inventory.getItem();

        if (!level.canMoveToPosition(targetPosition)) {
            return;
        }

        if (item === null) {
            return;
        }

        level.addEntityAt(targetPosition, item);
        this.inventory.removeItem();
    },
});
