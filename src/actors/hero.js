import {actor} from "./actor";
import {HERO_SPRITE_MAP} from "../sprite/sprites";
import {createInventory} from "../inventory/inventory";

export const createHero = () => {
    const inventory = createInventory();
    const hero = Object.create(actor);

    hero.inventory = inventory;
    hero.spriteMap = HERO_SPRITE_MAP;

    return hero;
};
