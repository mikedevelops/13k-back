import sprites from '../assets/sprites.png';

// RENDERER
const UNIT = 16;
const RESOLUTION = [16, 9];

// DIRECTIONS
const DIRECTION_LEFT = [-1, 0];
const DIRECTION_DOWN = [0, 1];
const DIRECTION_UP = [0, -1];
const DIRECTION_RIGHT = [1, 0];

// SETTINGS
const MAX_MOVES = 10;

const stage = document.getElementById('stage');
const STAGE_CTX = stage.getContext('2d');
const hiddenStage = document.getElementById('static');
const HIDDEN_CTX = hiddenStage.getContext('2d');

const scale = 2;

stage.width = (RESOLUTION[0] * UNIT) * scale;
stage.height = (RESOLUTION[1] * UNIT) * scale;

STAGE_CTX.imageSmoothingEnabled = false;
STAGE_CTX.scale(scale, scale);

const sprite = {
    draw: () => {
        throw new Error('draw method not implemented');
    },
    update: () => {
        throw new Error('update method not implemented')
    }
};

const getUnit = x => {
    if (Array.isArray(x)) {
        return [x[0] * UNIT, x[1] * UNIT];
    }
    return x * UNIT;
};

const dispatchEvent = (code, detail = {}) => {
    stage.dispatchEvent(new CustomEvent(code, detail));
};

const SPRITE_REF = document.createElement('img');
SPRITE_REF.src = sprites;

const player = Object.assign({}, sprite, {
    /**
     * Player position
     */
    position: [0, 5],

    /**
     * Player's origin
     */
    origin: [0, 5],

    /**
     * Player move count
     */
    moves: 0,

    /**
     * Player instruction history
     */
    history: [],

    /**
     * Where in time are we?
     */
    historyPointer: 0,

    /**
     * Draw the player
     */
    draw: function () {
        // ctx.fillStyle = 'white';
        // ctx.fillRect(
        //     getUnit(this.position[0]),
        //     getUnit(this.position[1]),
        //     UNIT,
        //     UNIT
        // );

        STAGE_CTX.drawImage(SPRITE_REF, 0, 0, 16, 16, getUnit(this.position[0]), getUnit(this.position[1]), UNIT, UNIT);
    },

    /**
     * Update the player
     */
    update: function () {
        this.draw();
    },

    /**
     * @param {number[]} direction
     */
    move: function (direction) {
        if (this.moves >= MAX_MOVES) {
            return;
        }

        this.moves++;
        this.history.push(direction);
        this.position = addVector(this.position, direction);
    },

    /**
     * Where we're going, we don't need roads
     */
    rewind: function () {
        if (this.history.length === 0) {
            return;
        }

        const direction = this.history.pop();
        this.moves--;
        this.position = subtractVector(this.position, direction);
    },

    /**
     * Get position in time
     * @param historyPointer
     * @return {number[]|*}
     */
    getPositionAt: function (historyPointer) {
        let pos = [...this.origin];

        if (this.history[historyPointer] === undefined) {
            return this.history[this.history.length - 1];
        }

        for (let m = 0; m < historyPointer; m++) {
            pos = addVector(pos, this.history[m]);
        }

        return pos;
    }
});

const ui = {
    drawMoves: () => {
        for (let m = 0; m < player.moves; m++) {
            drawNumber(getUnit(player.getPositionAt(m)), numbers[m + 1]);
        }

        // for (let m = 1; m <= MAX_MOVES; m++) {
        //     ctx.fillStyle = m <= player.moves ? 'red' : 'black';
        //     ctx.fillRect(getUnit(1) * (m - 1), 0, getUnit(0.5), getUnit(0.5));
        // }
    }
};

const drawBackground = () => {
    for (let y = 0; y < RESOLUTION[1]; y++) {
        for (let x = 0; x < RESOLUTION[0]; x++) {
            const chance = Math.random();

            if (chance < 0.025) {
                HIDDEN_CTX.drawImage(SPRITE_REF, 32, 0, 16, 16, getUnit(x), getUnit(y), UNIT, UNIT);
                continue;
            }

            if (chance < 0.1) {
                HIDDEN_CTX.drawImage(SPRITE_REF, 48, 0, 16, 16, getUnit(x), getUnit(y), UNIT, UNIT);
                continue;
            }

            if (chance < 0.5) {
                HIDDEN_CTX.drawImage(SPRITE_REF, 16, 0, 16, 16, getUnit(x), getUnit(y), UNIT, UNIT);
                continue;
            }

            HIDDEN_CTX.fillStyle = '#472d3c';
            HIDDEN_CTX.fillRect(getUnit(x), getUnit(y), UNIT, UNIT);
        }
    }
};

const restoreBackground = () => {
    STAGE_CTX.drawImage(hiddenStage, 0, 0);
};

const start = () => {
    STAGE_CTX.fillStyle = 'black';
    STAGE_CTX.fillRect(0, 0, stage.width, stage.height);

    SPRITE_REF.addEventListener('load', () => {
        drawBackground();
        update();
    });
};

const update = (delta) => {
    STAGE_CTX.clearRect(0, 0, stage.width, stage.height);
    restoreBackground();
    ui.drawMoves();
    player.draw();
};

const input = [];

input[65] = () => player.move(DIRECTION_LEFT);
input[83] = () => player.move(DIRECTION_DOWN);
input[87] = () => player.move(DIRECTION_UP);
input[68] = () => player.move(DIRECTION_RIGHT);
input[8] = () => player.rewind();

window.addEventListener('keydown', ev => {
    if (input[ev.keyCode] === undefined) {
        return;
    }

    input[ev.keyCode]();

    update();
});

const addVector = (a, b) => {
    return [a[0] + b[0], a[1] + b[1]];
};

const subtractVector = (a, b) => {
    return [a[0] - b[0], a[1] - b[1]];
};

const equals = (a, b) => a[0] === b[0] && a[1] === b[1];

const numbers = [];

numbers[1] = [,1,1,,,,1,,,,1,,,,1,,,1,1,1];
numbers[2] = [
    0,1,1,1,
    0,0,0,1,
    0,1,1,1,
    0,1,0,0,
    0,1,1,1
];
numbers[3] = [
    0,1,1,1,
    0,0,0,1,
    0,0,1,1,
    0,0,0,1,
    0,1,1,1
];
numbers[4] = [
    0,1,0,1,
    0,1,0,1,
    0,1,1,1,
    0,0,0,1,
    0,0,0,1
];
numbers[5] = [
    0,1,1,1,
    0,1,0,0,
    0,1,1,1,
    0,0,0,1,
    0,1,1,1
];
numbers[6] = [
    0,1,1,1,
    0,1,0,0,
    0,1,1,1,
    0,1,0,1,
    0,1,1,1
];
numbers[7] = [
    0,1,1,1,
    0,0,0,1,
    0,0,0,1,
    0,0,0,1,
    0,0,0,1
];
numbers[8] = [
    0,1,1,1,
    0,1,0,1,
    0,1,1,1,
    0,1,0,1,
    0,1,1,1
];
numbers[9] = [
    0,1,1,1,
    0,1,0,1,
    0,1,1,1,
    0,0,0,1,
    0,1,1,1
];
numbers[10] = [
    1,0,0,1,
    0,1,1,0,
    0,1,1,0,
    1,0,0,1,
    0,0,0,0
];

const FONT_SIZE = getUnit(0.1);

const drawNumber = (position, number) => {
    if (number === undefined) {
        return;
    }

    let pos = position;
    let origin = [position[0] + getUnit(0.25), position[1] + getUnit(0.25)];
    let col = 0;
    let row = 0;
    STAGE_CTX.fillStyle = 'red';
    STAGE_CTX.clearRect(origin[0], origin[1], FONT_SIZE * 4, FONT_SIZE * 5);

    if (equals(position, getUnit(player.position))) {
        return;
    }

    for (let i = 0; i < number.length; i++) {
        if (i !== 0 && i % 4 === 0) {
            col = 0;
            row++;
        }

        pos[0] = origin[0] + col * FONT_SIZE;
        pos[1] = origin[1] + row * FONT_SIZE;

        if (number[i]) {
            STAGE_CTX.fillRect(pos[0], pos[1], FONT_SIZE, FONT_SIZE);
        }

        col++;
   }
};

start();


