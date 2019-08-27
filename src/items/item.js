import { drawSprite, S_POT } from '../sprite/sprites';
import { STAGE_CTX } from '../stage/stage';

export const createItem = (id, position) => ({
    position: position,
    id: id,

    place: function ([x, y]) {
        this.position = [x, y];
        this.draw();
    },

    draw: function () {
        drawSprite(STAGE_CTX, this.id, this.position);
    },

    canPickup: function () {
        switch (this.id) {
            case S_POT:
                return true;
            default:
                return false;
        }
    }
});
