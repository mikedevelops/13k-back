import {
    DIRECTION_DOWN,
    DIRECTION_LEFT,
    DIRECTION_RIGHT,
    DIRECTION_UP, LEVEL_ACTIVE,
    LEVEL_SELECT,
    LEVEL_INTRO, LEVEL_START, LEVEL_COMPLETE
} from './game/constants';
import {hiddenStage, stage, STAGE_CTX} from './stage/stage';
import {SPRITE_REF} from './sprite/sprites';
import {createPlayer} from './actors/player';
import {createInventory} from './inventory/inventory';
import {levelManager} from './managers/levelManager';
import {levels} from './game/levels';

const levelSelect = levelManager();
const inventory = createInventory();
const player = createPlayer(inventory);

let GAME_STATE = LEVEL_SELECT;

const start = () => {
    STAGE_CTX.fillStyle = 'black';
    STAGE_CTX.fillRect(0, 0, stage.width, stage.height);
    SPRITE_REF.addEventListener('load', () => {
        levelSelect.load(levels);
        update();
    });
};

const update = (delta) => {
    STAGE_CTX.clearRect(0, 0, stage.width, stage.height);
    STAGE_CTX.fillStyle = '#472d3c';
    STAGE_CTX.fillRect(0, 0, hiddenStage.width, hiddenStage.height);

    switch (GAME_STATE) {
        case LEVEL_SELECT:
            levelSelect.draw();
            break;
        case LEVEL_INTRO:
            levelSelect.getCurrentLevel().intro();
            break;
        case LEVEL_START:
            player.position = levelSelect.getCurrentLevel().playerStartPosition;
            GAME_STATE = LEVEL_ACTIVE;
            update();
            break;
        case LEVEL_ACTIVE:
            updateLevel();
            player.update();
            break;
        case LEVEL_COMPLETE:
            GAME_STATE = LEVEL_SELECT;
            update();
            break;
    }
};

const updateLevel = () => {
    const level = levelSelect.getCurrentLevel();

    level.update();

    if (level.isComplete()) {
        level.complete();
    } else {
        level.inComplete();
    }
};

const input = [];

// RIGHT
input[68] = () => {
    switch (GAME_STATE) {
        case LEVEL_SELECT:
            levelSelect.nextLevel();
            break;
        case LEVEL_ACTIVE:
            player.move(levelSelect.getCurrentLevel(), DIRECTION_RIGHT);
            break;
    }
};

// LEFT
input[65] = () => {
    switch (GAME_STATE) {
        case LEVEL_SELECT:
            levelSelect.prevLevel();
            break;
        case LEVEL_ACTIVE:
            player.move(levelSelect.getCurrentLevel(), DIRECTION_LEFT);
            break;
    }
};

// ENTER
input[13] = () => {
    if (GAME_STATE === LEVEL_SELECT) {
        GAME_STATE = LEVEL_INTRO;
    }
};

// DOWN
input[83] = () => {
    switch (GAME_STATE) {
        case LEVEL_ACTIVE:
            player.move(levelSelect.getCurrentLevel(), DIRECTION_DOWN);
            break;
    }
};

// UP
input[87] = () => {
    switch (GAME_STATE) {
        case LEVEL_ACTIVE:
            player.move(levelSelect.getCurrentLevel(), DIRECTION_UP);
            break;
    }
};

// ACTION
input[69] = () => {
    switch (GAME_STATE) {
        case LEVEL_ACTIVE: {
            const empty = inventory.getItem() === null;
            const level = levelSelect.getCurrentLevel();

            if (empty) {
                player.pickup(level);
                return;
            }

            player.place(level);
        }
    }
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
    GAME_STATE = LEVEL_START;
    update();
});

stage.addEventListener('open_exit', event => {
    update();
});

stage.addEventListener('close_exit', event => {
    update();
});

stage.addEventListener('player_exit', event => {
    GAME_STATE = LEVEL_COMPLETE;
    levelSelect.getCurrentLevel().finished = true;
    levelSelect.getCurrentLevel().reset();
    update();
});

start();


