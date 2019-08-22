import { drawBackground, restoreBackground } from './background/background';
import {
    DIRECTION_DOWN,
    DIRECTION_LEFT,
    DIRECTION_RIGHT,
    DIRECTION_UP
} from './game/constants';
import { STAGE_CTX } from './stage/stage';
import { SPRITE_REF } from './sprite/sprites';
import { player } from './actors/player';
import { EntityManager } from './managers/entityManager';
import { createLevel } from './grid/level';

export const entityManager = new EntityManager();
const level1 = createLevel();

const start = () => {
    STAGE_CTX.fillStyle = 'black';
    STAGE_CTX.fillRect(0, 0, stage.width, stage.height);

    player.position = [1, 1];

    SPRITE_REF.addEventListener('load', () => {
        level1.load(
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
        );
        drawBackground(level1);
        update();
    });
};

const update = (delta) => {
    STAGE_CTX.clearRect(0, 0, stage.width, stage.height);
    restoreBackground();
    player.draw();
};

const input = [];

input[65] = () => player.move(DIRECTION_LEFT);
input[83] = () => player.move(DIRECTION_DOWN);
input[87] = () => player.move(DIRECTION_UP);
input[68] = () => player.move(DIRECTION_RIGHT);

window.addEventListener('keydown', ev => {
    if (input[ev.keyCode] === undefined) {
        return;
    }

    input[ev.keyCode]();

    update();
});

start();


