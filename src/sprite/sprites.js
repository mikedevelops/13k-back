import sprites from '../../assets/sprites.png';
import { UNIT } from '../game/constants';
import { randInt } from '../utils/units';
import { V_EAST, V_NORTH, V_SOUTH, V_WEST } from '../utils/vector';

export const SPRITE_REF = document.createElement('img');
SPRITE_REF.src = sprites;

export const drawSprite = (ctx, id, position) => {
    if (variations[id] !== undefined) {
        id = variations[id][randInt(0, variations[id].length - 1)];
    }

    const spriteMapPosition = [id * 16, 0];


    ctx.drawImage(
        SPRITE_REF,
        spriteMapPosition[0],
        spriteMapPosition[1],
        16,
        16,
        position[0],
        position[1],
        UNIT,
        UNIT,
    );
};

export const S_GROUND = 0;
export const S_WALL = 1;
export const S_PLAYER_E = 3;
export const S_DOORWAY = 4;
export const S_SKELETON_REMAINS = 5;
export const S_PLAYER_W = 6;
export const S_PLAYER_N = 7;
export const S_PLAYER_S = 8;
export const S_POT = 9;

export const PLAYER_SPRITE_MAP = {
    [V_NORTH]: S_PLAYER_N,
    [V_EAST]: S_PLAYER_E,
    [V_SOUTH]: S_PLAYER_S,
    [V_WEST]: S_PLAYER_W
};

const variations = {
    [S_GROUND]: [0, 2]
};
