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
import { staticGrid } from './grid/staticGrid';
import { Skeleton } from './actors/skeleton';
import { EntityManager } from './managers/entityManager';

export const entityManager = new EntityManager();

entityManager.addEntity(
    new Skeleton(3, 3)
);

const start = () => {
    STAGE_CTX.fillStyle = 'black';
    STAGE_CTX.fillRect(0, 0, stage.width, stage.height);

    player.position = [1, 1];

    SPRITE_REF.addEventListener('load', () => {
        drawBackground(staticGrid);
        // drawEntities(entityGrid);
        update();
    });
};

const update = (delta) => {
    STAGE_CTX.clearRect(0, 0, stage.width, stage.height);
    restoreBackground();

    entityManager.update();
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


