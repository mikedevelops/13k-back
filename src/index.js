import { drawBackground, restoreBackground } from './background/background';
import {
    DIRECTION_DOWN,
    DIRECTION_LEFT,
    DIRECTION_RIGHT,
    DIRECTION_UP
} from './game/constants';
import { STAGE_CTX } from './stage/stage';
import { SPRITE_REF } from './sprite/sprites';
import { createPlayer } from './actors/player';
import { EntityManager } from './managers/entityManager';
import { createLevel } from './grid/level';
import { createInventory } from './inventory/inventory';

export const entityManager = new EntityManager();
const level1 = createLevel();
const inventory = createInventory();
const player = createPlayer(inventory);

const start = () => {
    STAGE_CTX.fillStyle = 'black';
    STAGE_CTX.fillRect(0, 0, stage.width, stage.height);

    player.position = [1, 1];

    SPRITE_REF.addEventListener('load', () => {
        level1.load(
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 9, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 9, 1, 1, 1, 1, 1],
        );
        drawBackground(level1);
        update();
    });
};

const update = (delta) => {
    STAGE_CTX.clearRect(0, 0, stage.width, stage.height);
    level1.draw();
    player.update();
    // restoreBackground();
};

const input = [];

input[65] = () => player.move(level1, DIRECTION_LEFT);
input[83] = () => player.move(level1, DIRECTION_DOWN);
input[87] = () => player.move(level1, DIRECTION_UP);
input[68] = () => player.move(level1, DIRECTION_RIGHT);
input[69] = () => {
    const empty = inventory.getItem() === null;

    if (empty) {
        player.pickup(level1);
        return;
    }

    player.place(level1);
};

window.addEventListener('keydown', ev => {
    if (input[ev.keyCode] === undefined) {
        return;
    }

    input[ev.keyCode]();

    update();
});

start();


