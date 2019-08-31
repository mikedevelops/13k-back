import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP
} from './game/constants';
import { stage, STAGE_CTX } from './stage/stage';
import { SPRITE_REF } from './sprite/sprites';
import { createPlayer } from './actors/player';
import { EntityManager } from './managers/entityManager';
import { createLevel } from './grid/level';
import { createInventory } from './inventory/inventory';

const level1 = createLevel();
const inventory = createInventory();
const player = createPlayer(inventory);

const start = () => {
    STAGE_CTX.fillStyle = 'black';
    STAGE_CTX.fillRect(0, 0, stage.width, stage.height);

    player.position = [1, 1];

    SPRITE_REF.addEventListener('load', () => {
        level1.load(
            [1, 1, 1, 1, 1, 0, 0, 4, 1, 0, [11, 9], 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 4, 1, 9, 11, 1, 1, 1, 1, 1],
        );
        level1.start();
    });
};

const update = (delta) => {
    STAGE_CTX.clearRect(0, 0, stage.width, stage.height);
    level1.update();
    player.update();

    if (level1.isComplete()) {
        level1.complete();
    } else {
        level1.inComplete();
    }
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

stage.addEventListener('countdown', event => {
    console.log(event);
});

stage.addEventListener('start', event => {
    update();
});

stage.addEventListener('complete', event => {
    update();
});

stage.addEventListener('open_exit', event => {
    update();
});

stage.addEventListener('close_exit', event => {
    update();
});

start();


