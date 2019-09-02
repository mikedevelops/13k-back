import {actor} from '../actors/actor';
import {PLAYER_SPRITE_MAP} from "../sprite/sprites";
import {createInventory} from "../inventory/inventory";

export const createPlayer = () => {
    const inventory = createInventory();
    const player = Object.create(actor);

    player.spriteMap = PLAYER_SPRITE_MAP;
    player.inventory = inventory;
    player.lateUpdateCallback = function () {
        this.inventory.draw();
    };

    return player;
};
