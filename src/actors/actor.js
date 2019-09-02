import { getUnit } from '../utils/units';
import {addVector, equals, V_EAST} from "../utils/vector";
import {STAGE_CTX} from "../stage/stage";
import {clearSprite, drawSprite, S_DOORWAY_EXIT} from "../sprite/sprites";

export const actor = {
    /**
     * Actor ID
     */
    id: null,
    /**
     * Position
     */
    position: [0, 0],
    /**
     * Direction
     */
    direction: V_EAST,
    /**
     * Late Update callback
     */
    lateUpdateCallback: null,
    /**
     * Sprite map with direction support
     */
    spriteMap: null,
    /**
     * Inventory
     */
    inventory: null,
    /**
     * Get world position
     * @return {number[]}
     */
    getWorldPosition: function () {
        return this.position.map(p => getUnit(p));
    },
    /**
     * Draw the sprite
     */
    draw: function () {
        drawSprite(
            STAGE_CTX,
            this.spriteMap[this.direction],
            this.getWorldPosition()
        );
    },
    /**
     * Update
     */
    update: function (position = this.position) {
        this.position = position;
        this.draw();
        this.lateUpdate();
    },
    /**
     * Called after the main update function
     */
    lateUpdate: function () {
        if (this.lateUpdateCallback === null) {
            return;
        }

        this.lateUpdateCallback();
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
            const event = new CustomEvent('actor_exit', {
                detail: this.id
            });
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
        const item = this.inventory.getItem();

        if (!level.canMoveToPosition(targetPosition)) {
            return;
        }

        if (item === null) {
            return;
        }

        level.addEntityAt(targetPosition, item);
        this.inventory.removeItem();
    },
    action: function (level) {
        const empty = this.inventory.getItem() === null;

        if (empty) {
            this.pickup(level);
            return;
        }

        this.place(level);
    },
    hide: function () {
        clearSprite(STAGE_CTX, getUnit(this.position));
    }
};
