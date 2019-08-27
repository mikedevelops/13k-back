import { getUnit } from '../utils/units';
import { drawSprite, S_INVENTORY_SLOT } from '../sprite/sprites';
import { STAGE_CTX } from '../stage/stage';

export const createInventory = () => ({
    item: null,
    slotPosition: [0, 4],

    addItem: function (item) {
        if (this.item === null) {
            this.item = item;
            return;
        }
        this.item.place(item.position);
        this.item = item;
    },

    draw: function () {
        drawSprite(STAGE_CTX, S_INVENTORY_SLOT, getUnit(this.slotPosition));

        if (this.item !== null) {
            this.item.position = getUnit(this.slotPosition);
            this.item.draw();
        }
    },

    getItem: function () {
        return this.item;
    },

    removeItem: function () {
        this.item = null;
    }
});
