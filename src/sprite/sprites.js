import sprites from '../../assets/sprites.png';
import { UNIT } from '../game/constants';
import { randInt } from '../utils/units';

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

export const S_WALL = 1;
export const S_GROUND = 0;
export const S_PLAYER = 3;
export const S_DOORWAY = 4;
export const S_SKELETON_REMAINS = 5;
export const S_SKELETON = 6;

const variations = {
    [S_GROUND]: [0, 2]
};
