import {
    DIRECTION_DOWN,
    DIRECTION_LEFT,
    DIRECTION_RIGHT,
    DIRECTION_UP,
    LEVEL_ACTIVE,
    LEVEL_COMPLETE, LEVEL_INTRO,
    LEVEL_REVEAL,
    LEVEL_SELECT,
    LEVEL_START
} from './game/constants';
import {hiddenStage, stage, STAGE_CTX} from './stage/stage';
import {SPRITE_REF} from './sprite/sprites';
import {createPlayer} from './actors/player';
import {levelManager} from './managers/levelManager';
import {levels} from './game/levels';
import {I_ACTION, I_MOVE_EAST, I_MOVE_NORTH, I_MOVE_SOUTH, I_MOVE_WEST} from "./instructions/instructions";
import {createHero} from "./actors/hero";
import {V_EAST, V_NORTH, V_SOUTH, V_WEST} from "./utils/vector";
import {randInt} from "./utils/units";

const levelSelect = levelManager();
const player = createPlayer();
const hero = createHero();

export let GAME_STATE = LEVEL_SELECT;

const start = () => {
    STAGE_CTX.fillStyle = 'black';
    STAGE_CTX.fillRect(0, 0, stage.width, stage.height);
    SPRITE_REF.addEventListener('load', () => {
        levelSelect.load(levels);
        update();
    });
};

let instructionTimeout = null;

const processInstruction = (instruction, level) => {
    if (instruction === null) {
        return;
    }

    switch (instruction) {
        case I_MOVE_NORTH:
            hero.move(level, V_NORTH);
            break;
        case I_MOVE_EAST:
            hero.move(level, V_EAST);
            break;
        case I_MOVE_SOUTH:
            hero.move(level, V_SOUTH);
            break;
        case I_MOVE_WEST:
            hero.move(level, V_WEST);
            break;
        case I_ACTION:
            hero.action(level);
            break;
    }

    hero.update();
    instructionTimeout = setTimeout(update, randInt(150, 500));
};

const update = (delta) => {
    STAGE_CTX.clearRect(0, 0, stage.width, stage.height);
    STAGE_CTX.fillStyle = '#472d3c';
    STAGE_CTX.fillRect(0, 0, hiddenStage.width, hiddenStage.height);

    // level.update(level.introState);
    //
    // const instruction = level.getNextInstruction();
    //
    //

    const level = levelSelect.getCurrentLevel();

    switch (GAME_STATE) {
        case LEVEL_SELECT:
            levelSelect.draw();
            break;
        case LEVEL_REVEAL:
            level.reveal();
            hero.position = level.heroStartPosition;
            break;
        case LEVEL_INTRO:
            level.update(level.introState);
            processInstruction(level.getNextInstruction(), level);
            break;
        case LEVEL_START:
            player.position = level.playerStartPosition;
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
        GAME_STATE = LEVEL_REVEAL;
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
            player.action(levelSelect.getCurrentLevel());
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

stage.addEventListener('reveal_finished', event => {
    GAME_STATE = LEVEL_INTRO;
    update();
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

stage.addEventListener('actor_exit', event => {
    if (GAME_STATE === LEVEL_INTRO) {
        GAME_STATE = LEVEL_START;
        hero.position = [100, 100];
        setTimeout(update, 3000);
        return;
    }

    GAME_STATE = LEVEL_COMPLETE;
    levelSelect.getCurrentLevel().finished = true;
    levelSelect.getCurrentLevel().reset();
    update();
});

start();


