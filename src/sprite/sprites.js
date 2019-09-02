import sprites from '../../assets/sprites.png';
import {UNIT} from '../game/constants';
import {V_EAST, V_NORTH, V_SOUTH, V_WEST} from '../utils/vector';

export const SPRITE_SIZE = 16;
export const SPRITE_REF = document.createElement('img');
SPRITE_REF.src = sprites;

export const clearSprite = (ctx, position) => {
    ctx.clearRect(position[0], position[1], SPRITE_SIZE, SPRITE_SIZE);
};

export const drawSprite = (ctx, id, position) => {
    // FIXME: variants need calculating once not on each draw
    // if (variations[id] !== undefined) {
    //     id = variations[id][randInt(0, variations[id].length - 1)];
    // }

    // TODO: fix this when  the above is fixed
    if (id === 0) {
        id = S_GROUND_VARIANT_1;
    }

    const spriteMapPosition = [id * 16, 0];

    ctx.drawImage(
        SPRITE_REF,
        spriteMapPosition[0],
        spriteMapPosition[1],
        SPRITE_SIZE,
        SPRITE_SIZE,
        position[0],
        position[1],
        UNIT,
        UNIT,
    );
};

export const S_GROUND = 0;
export const S_WALL = 1;
export const S_GROUND_VARIANT_1 = 2;
export const S_HERO_E = 3;
export const S_DOORWAY = 4;
export const S_SKELETON_REMAINS = 5;
export const S_HERO_W = 6;
export const S_HERO_N = 7;
export const S_HERO_S = 8;
export const S_POT = 9;
export const S_INVENTORY_SLOT = 10;
export const S_GROUND_TILE = 11;
export const S_DOORWAY_EXIT = 12;
export const S_TROPHY = 23;
export const S_TROPHY_COMPLETE = 24;
export const S_PLAYER_E = 25;
export const S_PLAYER_W = 26;
export const S_PLAYER_S = 27;
export const S_PLAYER_N = 28;

export const S_NUMBERS = 13;

export const HERO_SPRITE_MAP = {
    [V_NORTH]: S_HERO_N,
    [V_EAST]: S_HERO_E,
    [V_SOUTH]: S_HERO_S,
    [V_WEST]: S_HERO_W
};

export const PLAYER_SPRITE_MAP = {
    [V_NORTH]: S_PLAYER_N,
    [V_EAST]: S_PLAYER_E,
    [V_SOUTH]: S_PLAYER_S,
    [V_WEST]: S_PLAYER_W
};

const variations = {
    [S_GROUND]: [0, 2]
};
